<template>
  <ElDynamicTable :columns="columns" :data="tableData" />
</template>

<script lang="ts" setup>
import { ElDynamicTable } from '@element-plus/components/dynamic-table'

const columns = [
  {
    type: 'index',
    index: (index: number) => {
      return index * 2
    },
  },
  {
    label: 'Date',
    prop: 'date',
    width: 180,
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
]

const tableData = [
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
]
</script>

<style lang="scss" scoped></style>
