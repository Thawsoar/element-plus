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
    columnsKeyName: null,
    align: {
      type: String,
      default: 'left',
    },
    // 是否展示分页控件
    showPagination: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          currentPage: 1,
          pageSize: 50,
          total: 0,
        }
      },
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50],
    },
    layout: {
      type: String,
      default: 'prev, pager, next, total, sizes',
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
    paginationStyle: {
      type: Object,
      default: () => {
        return {
          background: '#fff',
          border: '1px solid #ebeef5',
          borderRadius: '4px',
          marginBottom: '10px',
          padding: '10px',
        }
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
  setup(props, ctx) {
    const { emit, attrs, slots, expose } = ctx
    const table = ref()
    provide('tableRoot', ctx)
    const page = reactive(props.pagination)
    const tableSettingDialogVisible = ref(false)
    const selectedShowColumns = ref([]) as any
    //当改变size的时候 可能会触发changePageNo，导致页面指示不正确
    let flag = false
    // 当前页面size改变
    const handleSizeChange = (val) => {
      flag = true
      page.pageSize = val
      page.currentPage = 1
      emit('size-change', val)
      emit('page-change', page)
      nextTick(() => {
        flag = false
      })
    }
    // 当前页改变
    const handleCurrentChange = (val) => {
      if (!flag) {
        page.currentPage = val
        emit('current-change', val)
        emit('page-change', page)
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
      () => props.pagination,
      (val) => {
        Object.assign(page, val)
      },
      {
        immediate: true,
        deep: true,
      }
    )
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
    const tableProps = computed(() => {
      const obj = {}
      Object.keys(defaultProps).forEach((key) => {
        if (props[key]) {
          obj[key] = props[key]
        }
      })
      return obj
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
        {props.showPagination && (
          // 分页组件
          <div
            class="base-pagination base-dynamic-table-pagination"
            style={props.paginationStyle}
          >
            <div class="page-aside">{slots.pageAside?.()}</div>
            <el-pagination
              class="base-pagination--target"
              background
              v-model={[page.currentPage, 'currentPage']}
              onSizeChange={handleSizeChange}
              onCurrentChange={handleCurrentChange}
              pageSizes={props.pageSizes}
              pageSize={page.pageSize}
              pagerCount={props.pagerCount}
              layout={props.layout}
              total={page.total}
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
