<template>
  <ElDynamicTable
    :columns="columns"
    :data="tableData"
    :pagination="false"
    height="250"
  />
</template>

<script lang="ts" setup>
import { reactive } from '@vue/runtime-core'
import { ElDynamicTable } from '@element-plus/components/dynamic-table'

const columns = [
  {
    label: 'Date',
    prop: 'date',
    width: 120,
    fixed: 'left',
  },
  {
    label: 'Name',
    prop: 'name',
    width: 110,
  },
  {
    label: 'State',
    prop: 'state',
    width: 120,
  },
  {
    label: 'City',
    prop: 'city',
    width: 320,
  },
  {
    label: 'Address',
    prop: 'address',
    width: 600,
  },
  {
    label: 'Zip',
    prop: 'zip',
    width: 120,
  },
]

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]
</script>

<style lang="scss" scoped></style>
