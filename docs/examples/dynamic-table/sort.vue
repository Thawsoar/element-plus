<template>
  <ElDynamicTable
    :columns="columns"
    :data="tableData"
    :pagination="false"
    :default-sort="{ prop: 'date', order: 'descending' }"
  />
</template>

<script lang="ts" setup>
import { reactive } from '@vue/runtime-core'
import { ElDynamicTable } from '@element-plus/components/dynamic-table'

interface User {
  date: string
  name: string
  address: string
}

const formatter = (row, column) => {
  return `${column.property}: ${row.address}( 我是格式化后的内容 )`
}
const columns = [
  {
    label: '日期',
    sortable: true,
    prop: 'date',
    width: 180,
  },
  {
    label: '姓名',
    prop: 'name',
    width: 180,
  },
  {
    label: '地址',
    prop: 'address',
    formatter,
  },
]

const tableData = reactive([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
</script>

<style lang="scss" scoped></style>
