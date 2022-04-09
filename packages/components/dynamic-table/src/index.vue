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
} from 'vue'
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
    // 需要隐藏的列，prop
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
      default: () => ['base-dynamic-table'],
    },
  },
  emits: ['update:pagination', 'size-change', 'current-change', 'page-change'],
  setup(props, ctx) {
    const { emit, attrs, slots, expose } = ctx
    const table = ref()
    provide('tableRoot', ctx)
    // 表格相关props
    const tableProps = computed(() => {
      const obj = {}
      Object.keys(defaultProps).forEach((key) => {
        if (props[key]) {
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
        console.log(value)
        emit('update:pagination', value)
      },
    }) as any
    const tableSettingDialogVisible = ref(false)
    const selectedShowColumns = ref([]) as any
    //当改变size的时候 可能会触发changePageNo，导致页面指示不正确
    let flag = false
    // 当前页面size改变
    const handleSizeChange = (val) => {
      console.log('handleSizeChange', val)
      flag = true
      page.value = Object.assign(page.value, { pageSize: val, currentPage: 1 })
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
      if (!flag) {
        // page.value = {
        //   ...page.value,
        //   currentPage: val,
        // }
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
    // 初始化表格列
    const initSelectedShowColumns = () => {
      selectedShowColumns.value = props.columns.filter(
        (column: any) => !props.hideColumns.includes(column.prop)
      )
    }
    // 确认表格设置
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
    const openColumnSettingDialog = () => {
      tableSettingDialogVisible.value = true
    }
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
          <div class="base-pagination base-dynamic-table-pagination">
            <div class="page-aside">{slots.pageAside?.()}</div>
            <el-pagination
              class="base-pagination--target"
              {...page.value}
              v-model={[page.currentPage, 'currentPage']}
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
