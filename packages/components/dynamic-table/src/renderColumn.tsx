import { defineComponent } from 'vue'
import { ElTableColumn } from '@element-plus/components/table'
import { ElTooltip } from '@element-plus/components/tooltip'
import { InfoFilled } from '@element-plus/icons-vue'
import TableSlot from './slot'
import TableSlotHeader from './slotHeader'
const RenderColumn = defineComponent({
  name: 'RenderColumn',
  components: {
    TableSlot,
    TableSlotHeader,
    ElTableColumn,
    ElTooltip,
    InfoFilled,
  },
  props: {
    column: {
      type: Object,
      default: () => {
        return {}
      },
    },
    //对齐方式
    align: {
      type: String,
      default: 'left',
    },
    // 全局行配置，内容过多是否展示省略
    showOverflowTooltip: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    // 渲染表头
    const renderHeader = (configColumn) => {
      if (configColumn.showHeaderTooltip) {
        return (
          <span>
            {configColumn.label}
            <el-tooltip
              placement="top"
              effect="light"
              content={configColumn.headerTooltipText}
            >
              <span class="table-header-tip-icon" style="font-size: 12px">
                <info-filled style="width: 14px;height: 14px; display: inline-block;margin: 0 0 3px 6px;" />
              </span>
            </el-tooltip>
          </span>
        )
      } else {
        return <span>{configColumn.label}</span>
      }
    }
    const columnRenderHeaderSlot = (column) => (scope) => {
      if (column.renderHeader) {
        // scope为 table-column Scoped Slot 自定义表头的内容. 参数为 { column, $index }
        return column.renderHeader(column, scope)
      } else {
        if (column.slotHeader) {
          return (
            <table-slot-header
              column={column}
              scope={scope}
            ></table-slot-header>
          )
        }
        return renderHeader(column)
      }
    }
    // 自定义渲染
    function genRender(column) {
      return (
        <el-table-column
          {...column}
          align={props.align}
          showOverflowTooltip={
            column.showOverflowTooltip == undefined
              ? props.showOverflowTooltip
              : column.showOverflowTooltip
          }
          v-slots={{
            default: ({ row, $index }) => {
              return column.render(row, column, $index)
            },
            header: columnRenderHeaderSlot(column),
          }}
        ></el-table-column>
      )
    }
    // 插槽
    function genSlot(column) {
      return (
        <el-table-column
          {...column}
          sortable={column.sortable}
          align={props.align}
          showOverflowTooltip={
            column.showOverflowTooltip == undefined
              ? props.showOverflowTooltip
              : column.showOverflowTooltip
          }
          v-slots={{
            default: ({ row, $index }) => {
              return (
                <table-slot
                  row={row}
                  column={column}
                  index={$index}
                ></table-slot>
              )
            },
            header: columnRenderHeaderSlot(column),
          }}
        ></el-table-column>
      )
    }
    // 渲染多级表头
    function genChildren(column) {
      const childrenColumn = column.children
      return (
        <el-table-column
          label={column.label}
          align={props.align}
          headerAlign={column.headerAlign}
          v-slots={{
            header: columnRenderHeaderSlot(column),
          }}
        >
          {childrenColumn.map((column) => renderColumn(column))}
        </el-table-column>
      )
    }
    // 渲染展开项
    function genExpand(column) {
      // 展开项可以使用render函数，也可以使用插槽，使用插槽需声明 slot: 'expand',
      return (
        <el-table-column
          label={column.label}
          type="expand"
          v-slots={{
            default: ({ row, $index }) => {
              if (column.render) {
                // 渲染函数
                return column.render(row, column, $index)
              } else {
                // 通过插槽渲染展开项
                return (
                  <table-slot
                    row={row}
                    column={column}
                    index={$index}
                  ></table-slot>
                )
              }
            },
            header: columnRenderHeaderSlot(column),
          }}
        ></el-table-column>
      )
    }
    // 通用格式化
    const commonformatter = (row, column) => {
      return row[column['property']] || '-'
    }
    // 普通的表格
    function genCommonColumn(column) {
      const formatter = column.formatter || commonformatter
      return (
        <el-table-column
          {...column}
          align={props.align}
          // selectable 只对仅对 type=selection 的列有效
          selectable={column.selectable}
          showOverflowTooltip={
            column.showOverflowTooltip == undefined
              ? props.showOverflowTooltip
              : column.showOverflowTooltip
          }
          formatter={formatter}
          v-slots={{
            header: columnRenderHeaderSlot(column),
          }}
        ></el-table-column>
      )
    }
    function renderColumn(column) {
      if (column.render && column.type !== 'expand') {
        return genRender(column)
      } else if (column.slot && column.type !== 'expand') {
        return genSlot(column)
      } else if (column.children) {
        return genChildren(column)
      } else if (column.type === 'expand') {
        return genExpand(column)
      } else {
        return genCommonColumn(column)
      }
    }
    return () => renderColumn(props.column)
  },
})

export default RenderColumn
