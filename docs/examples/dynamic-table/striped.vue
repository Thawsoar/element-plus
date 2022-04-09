<template>
  <ElDynamicTable
    :pagination="false"
    :columns="columns"
    :data="tableData"
    stripe
  />
</template>

<script lang="ts" setup>
import { reactive } from '@vue/runtime-core'
import { ElDynamicTable } from '@element-plus/components/dynamic-table'

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
])
</script>

<style lang="scss" scoped></style>
