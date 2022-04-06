<template>
  <ElDynamicTable
    ref="singleTableRef"
    :columns="columns"
    :data="tableData"
    highlight-current-row
    style="width: 100%"
    @current-change="handleCurrentChange"
  />
  <div style="margin-top: 20px">
    <el-button @click="setCurrent(tableData[1])">Select second row</el-button>
    <el-button @click="setCurrent()">Clear selection</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElDynamicTable } from '@element-plus/components/dynamic-table'
import type { ElTable } from 'element-plus'

interface User {
  date: string
  name: string
  address: string
}
const columns = [
  {
    type: 'index',
    width: 50,
  },
  {
    label: 'Date',
    prop: 'date',
    width: 120,
  },
  {
    label: 'Name',
    prop: 'name',
    width: 120,
  },
  {
    label: 'Address',
    prop: 'address',
  },
]
const currentRow = ref()
const singleTableRef = ref() as any

const setCurrent = (row?: User) => {
  singleTableRef.value!.table.setCurrentRow(row)
}
const handleCurrentChange = (val: User | undefined) => {
  currentRow.value = val
}
const tableData: User[] = [
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
]
</script>

<style lang="scss" scoped></style>
