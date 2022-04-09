<template>
  <ElDynamicTable :columns="columns" :data="tableData" :pagination="false">
    <template #date="{ row }">
      <div style="display: flex; align-items: center">
        <el-icon><timer /></el-icon>
        <span style="margin-left: 10px">{{ row.date }}</span>
      </div>
    </template>
    <template #name="{ row }">
      <el-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ row.name }}</div>
          <div>address: {{ row.address }}</div>
        </template>
        <template #reference>
          <el-tag>{{ row.name }}</el-tag>
        </template>
      </el-popover>
    </template>
    <template #operations="{ row, $index }">
      <el-button size="small" @click="handleEdit($index, row)">Edit</el-button>
      <el-button size="small" type="danger" @click="handleDelete($index, row)"
        >Delete</el-button
      >
    </template>
  </ElDynamicTable>
</template>

<script lang="ts" setup>
import { reactive } from '@vue/runtime-core'
import { ElMessage } from 'element-plus'
import { ElDynamicTable } from '@element-plus/components/dynamic-table'
import { Timer } from '@element-plus/icons-vue'

interface User {
  date: string
  name: string
  address: string
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
  ElMessage.success(`edit ${index} ${row.name}`)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
  ElMessage.error(`delete ${index} ${row.name}`)
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

const columns = [
  {
    label: 'Date',
    prop: 'date',
    width: 180,
    slot: 'date',
  },
  {
    label: 'Name',
    prop: 'name',
    width: 180,
    slot: 'name',
  },
  {
    label: 'Operations',
    prop: 'operations',
    slot: 'operations',
  },
]
</script>

<style lang="scss" scoped></style>
