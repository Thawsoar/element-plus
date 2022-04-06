<template>
  <ElDynamicTable
    ref="multipleTableRef"
    :columns="columns"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  />
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])"
      >Toggle selection status of second and third rows</el-button
    >
    <el-button @click="toggleSelection()">Clear selection</el-button>
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
    type: 'selection',
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
    showOverflowTooltip: true,
  },
]
const multipleTableRef = ref() as any
const multipleSelection = ref<User[]>([])
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      multipleTableRef.value!.table.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.table.clearSelection()
  }
}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
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
    address:
      'No. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los Angeles',
  },
]
</script>

<style lang="scss" scoped></style>
