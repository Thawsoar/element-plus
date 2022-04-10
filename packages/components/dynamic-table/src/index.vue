<script lang="tsx">
import {
  defineComponent,
  reactive,
  ref,
  nextTick,
  provide,
  watch,
  onMounted,
  computed,
  getCurrentInstance,
} from 'vue'
import { useOffsetPagination } from '@vueuse/core'
import ElTable, { ElTableColumn } from '@element-plus/components/table'

import ElPagination from '@element-plus/components/pagination'
import defaultProps from '@element-plus/components/table/src/table/defaults'
import RenderColumn from './renderColumn'
import TableSetting from './tableSetting'
import type paginationProps from '@element-plus/components/pagination/src/pagination'
import type { ExtractPropTypes } from 'vue'
export type PaginationProps = ExtractPropTypes<typeof paginationProps>

// 默认初始导航配置
const defaultPaginationProps = {
  background: true,
  pageSize: 50,
  total: 0,
  layout: 'prev, pager, next, total, sizes',
  pageSizes: [10, 20, 30, 40, 50],
  pagerCount: 7,
  currentPage: 1,
}
const BaseDynamicTable = defineComponent({
  name: 'DynamicTable',
  components: {
    ElTable,
    ElTableColumn,
    ElPagination,
    RenderColumn,
    TableSetting,
  },
  props: {
    ...defaultProps,
    // 表格列
    columns: {
      type: Array,
      default: () => [],
    },
    // 需要隐藏的列<prop>
    hideColumns: {
      type: Array,
      default: () => [],
    },
    align: {
      type: String,
      default: 'left',
    },
    pagination: {
      type: [Boolean, Object],
      default: () => {
        return defaultPaginationProps
      },
    },
    // 单选按钮是否可勾选
    selectable: {
      type: Function,
      default: () => true,
    },
    // 全局行配置，内容过多是否展示省略
    showOverflowTooltip: {
      type: Boolean,
      default: true,
    },
    showTableSetting: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: Array,
      default: () => ['dynamic-table'],
    },
  },
  emits: ['update:pagination', 'size-change', 'current-change', 'page-change'],
  setup(props, ctx) {
    provide('tableRoot', ctx)
    const { emit, attrs, slots, expose } = ctx
    const vnodeProps = getCurrentInstance()!.vnode.props || {}
    // 判断pagination是否双向绑定了
    const hasPaginationListener = 'onUpdate:pagination' in vnodeProps
    // 是否是本地分页
    const isLocalPagination = computed(
      () => !hasPaginationListener && props.pagination !== false
    )
    // 表格ref dom expose出去用于elTable方法调用
    const table = ref()
    // 表格相关props
    const tableProps = computed(() => {
      const obj = {}
      Object.keys(defaultProps).forEach((key) => {
        if (props[key] && key !== 'data') {
          obj[key] = props[key]
        }
      })
      return obj
    })
    // 是否展示导航
    const showPagination = computed(() => props.pagination !== false)

    const page = computed({
      get() {
        return Object.assign(defaultPaginationProps, props.pagination)
      },
      set(value) {
        emit('update:pagination', value)
      },
    }) as any
    // 表格设置弹窗
    const tableSettingDialogVisible = ref(false)

    //当改变size的时候 可能会触发changePageNo，导致页面指示不正确
    let flag = false
    // 当前页面size改变
    const handleSizeChange = (val) => {
      console.log('handleSizeChange', val)
      if (isLocalPagination.value) {
        useOffsetPaginationReturn.value.currentPageSize = val
        useOffsetPaginationReturn.value.currentPage = 1
      }
      // flag = true
      page.value = Object.assign(page.value, {
        pageSize: val,
        currentPage: 1,
      })
      emit('size-change', val)
      emit('page-change', {
        pageSize: val,
        currentPage: page.value.currentPage,
      })
      nextTick(() => {
        flag = false
      })
    }
    // 当前页改变
    const handleCurrentChange = (val) => {
      console.log('handleCurrentChange', val)
      if (isLocalPagination.value) {
        useOffsetPaginationReturn.value.currentPage = val
      }
      if (!flag) {
        page.value = Object.assign(page.value, { currentPage: val })
        console.log('page', page.value, val)
        emit('current-change', val)
        emit('page-change', {
          pageSize: page.value.pageSize,
          currentPage: val,
        })
      }
      flag = false
    }

    // 打开设置弹窗
    const openColumnSettingDialog = () => {
      tableSettingDialogVisible.value = true
    }

    // 分页相关
    const tableData = ref([]) as any
    function fetch(page: number, pageSize: number) {
      const start = (page - 1) * pageSize
      const end = start + pageSize
      return props.data.slice(start, end)
    }
    function fetchData({
      currentPage,
      currentPageSize,
    }: {
      currentPage: number
      currentPageSize: number
    }) {
      tableData.value = fetch(currentPage, currentPageSize)
    }
    // 监听数据长度 重新设置分页
    const useOffsetPaginationReturn = ref()
    watch(
      () => props.data.length,
      () => {
        // 判断pagination开启并且双向绑定了，如果双向绑定了意味着远程调用接口数据进行分页，否则传入固定条数数据进行分页展示
        if (isLocalPagination.value) {
          fetchData({
            currentPage: page.value.currentPage,
            currentPageSize: page.value.pageSize,
          })
          page.value = Object.assign(page.value, { total: props.data.length })

          useOffsetPaginationReturn.value = useOffsetPagination({
            total: props.data.length,
            page: page.value.currentPage,
            pageSize: page.value.pageSize,
            onPageChange: fetchData,
            onPageSizeChange: fetchData,
          })
        }
      },
      {
        immediate: true,
      }
    )
    // 确认表格设置
    // 选择展示的列
    const selectedShowColumns = ref([]) as any
    const confirmTableSetting = (checkedColumns) => {
      selectedShowColumns.value.forEach((item) => {
        if (checkedColumns.includes(item.label)) {
          item.hide = false
        } else {
          if (item.label) {
            item.hide = true
          }
        }
      })
      tableSettingDialogVisible.value = false
    }
    // 初始化表格列
    const initSelectedShowColumns = () => {
      selectedShowColumns.value = props.columns.filter(
        (column: any) => !props.hideColumns.includes(column.prop)
      )
    }
    // 监听隐藏的列
    watch(
      () => props.hideColumns,
      () => {
        initSelectedShowColumns()
      }
    )
    onMounted(() => {
      initSelectedShowColumns()
    })

    expose({
      table,
    })

    return () => (
      <div class={props.customClass}>
        {props.showTableSetting && (
          <div class="table-setting" onClick={openColumnSettingDialog}>
            <i class="el-icon-setting"></i>
          </div>
        )}
        <el-table
          ref={(el) => (table.value = el)}
          {...tableProps.value}
          {...attrs}
          data={isLocalPagination.value ? tableData.value : props.data}
        >
          {selectedShowColumns.value.map((column) => {
            return column.hide ? null : (
              <RenderColumn
                key={column.prop}
                column={column}
                align={props.align}
                showOverflowTooltip={props.showOverflowTooltip}
              />
            )
          })}
        </el-table>
        {showPagination.value && (
          // 分页组件
          <div class="pagination dynamic-table-pagination">
            <div class="page-aside">{slots.pageAside?.()}</div>
            <el-pagination
              class="pagination--target"
              {...page.value}
              currentPage={page.value.currentPage}
              onUpdateCurrentPage={(value) => {
                if (hasPaginationListener) {
                  page.value.currentPage = value
                }
              }}
              onSizeChange={handleSizeChange}
              onCurrentChange={handleCurrentChange}
            ></el-pagination>
          </div>
        )}
        <table-setting
          v-model={tableSettingDialogVisible.value}
          onConfirm={confirmTableSetting}
          columnOptions={props.columns}
          hideColumns={props.hideColumns}
        />
      </div>
    )
  },
})

export default BaseDynamicTable
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
