import { h, inject } from 'vue'
const TableSlotHeader = (props) => {
  const tableRoot = inject('tableRoot') as any
  return h(
    'span',
    {},
    tableRoot?.slots[props.column.slotHeader]({
      column: props.column,
      scope: props.scope,
    })
  )
}

TableSlotHeader.props = {
  column: {
    type: Object,
    default: null,
  },
  scope: {
    type: Object,
    default: null,
  },
}
export default TableSlotHeader
