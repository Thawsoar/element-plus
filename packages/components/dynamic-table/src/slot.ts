import { h, inject } from 'vue'
const TableSlot = (props) => {
  const tableRoot = inject('tableRoot') as any
  return h(
    'span',
    {},
    tableRoot?.slots[props.column.slot]
      ? tableRoot?.slots[props.column.slot]({
          row: props.row,
          column: props.column,
          $index: props.index,
        })
      : null
  )
}

TableSlot.props = {
  row: Object,
  index: Number,
  column: {
    type: Object,
    default: null,
  },
}
export default TableSlot
