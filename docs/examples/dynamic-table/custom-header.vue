<template>
  <ElDynamicTable
    :columns="columns"
    :data="filterTableData"
    :pagination="false"
  >
    <template #header>
      <el-input v-model="search" size="small" placeholder="Type to search" />
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
import { computed, ref } from '@vue/runtime-core'
import { ElMessage } from 'element-plus'
import { ElDynamicTable } from '@element-plus/components/dynamic-table'

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
    name: 'Jerry',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Antfu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Sheep',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const columns = [
  {
    label: 'Date',
    prop: 'date',
    width: 180,
    showHeaderTooltip: true,
    headerTooltipText: '我是提示内容',
  },
  {
    label: 'Name',
    prop: 'name',
    width: 180,
    // 不建议使用
    // renderHeader: ({ column }) => {
    //   return <span>{column.label}</span>
    // },
  },
  {
    label: 'Operations',
    prop: 'operations',
    slot: 'operations',
    slotHeader: 'header',
  },
]

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>

<style lang="scss" scoped></style>
