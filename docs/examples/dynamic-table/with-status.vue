<template>
  <ElDynamicTable
    :columns="columns"
    :data="tableData"
    :pagination="false"
    :row-class-name="tableRowClassName"
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
const columns = [
  {
    label: '日期',
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
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: User
  rowIndex: number
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
