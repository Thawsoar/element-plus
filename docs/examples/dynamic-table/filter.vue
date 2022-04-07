<template>
  <el-button @click="resetDateFilter">reset date filter</el-button>
  <el-button @click="clearFilter">reset all filters</el-button>
  <ElDynamicTable
    ref="tableRef"
    :columns="columns"
    :data="tableData"
    row-key="date"
  >
    <template #tag="scope">
      <el-tag
        :type="scope.row.tag === 'Home' ? '' : 'success'"
        disable-transitions
        >{{ scope.row.tag }}</el-tag
      >
    </template>
  </ElDynamicTable>
</template>

<script lang="ts" setup>
import { reactive, ref } from '@vue/runtime-core'
import { ElDynamicTable } from '@element-plus/components/dynamic-table'

interface User {
  date: string
  name: string
  address: string
  tag: string
}
const filterTag = (value: string, row: User) => {
  return row.tag === value
}
const filterHandler = (value: string, row: User, column: any) => {
  const property = column['property']
  return row[property] === value
}

const columns = [
  {
    label: 'Date',
    prop: 'date',
    sortable: true,
    width: 180,
    columnKey: 'date',
    filters: [
      { text: '2016-05-01', value: '2016-05-01' },
      { text: '2016-05-02', value: '2016-05-02' },
      { text: '2016-05-03', value: '2016-05-03' },
      { text: '2016-05-04', value: '2016-05-04' },
    ],
    filterMethod: filterHandler,
  },
  {
    label: 'Name',
    prop: 'name',
    width: 180,
  },
  {
    label: 'Address',
    prop: 'address',
  },
  {
    label: 'Tag',
    prop: 'tag',
    slot: 'tag',
    filters: [
      { text: 'Home', value: 'Home' },
      { text: 'Office', value: 'Office' },
    ],
    filterMethod: filterTag,
    filterPlacement: 'bottom-end',
  },
]

const tableData = reactive([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
])

const tableRef = ref() as any

const resetDateFilter = () => {
  tableRef.value!.table.clearFilter(['date'])
}
// TODO: improvement typing when refactor table
const clearFilter = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  tableRef.value!.table.clearFilter()
}
</script>

<style lang="scss" scoped></style>
