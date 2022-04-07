<template>
  <ElDynamicTable
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    default-expand-all
    :columns="columns"
    :data="tableData"
  />
  <ElDynamicTable
    row-key="id"
    border
    :columns="columns"
    :data="tableData1"
    lazy
    :load="load"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  />
</template>

<script lang="ts" setup>
import { ElDynamicTable } from '@element-plus/components/dynamic-table'

const columns = [
  {
    label: 'Date',
    prop: 'date',
    width: 180,
    sortable: true,
  },
  {
    label: 'Name',
    prop: 'name',
    width: 180,
    sortable: true,
  },
]

interface User {
  id: number
  date: string
  name: string
  hasChildren?: boolean
  children?: User[]
}

const load = (
  row: User,
  treeNode: unknown,
  resolve: (date: User[]) => void
) => {
  setTimeout(() => {
    resolve([
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
      },
    ])
  }, 1000)
}

const tableData: User[] = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    children: [
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
      },
    ],
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
  },
]

const tableData1: User[] = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    hasChildren: true,
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
  },
]
</script>

<style lang="scss" scoped></style>
