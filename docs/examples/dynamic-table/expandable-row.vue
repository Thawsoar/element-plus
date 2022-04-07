<template>
  <ElDynamicTable :columns="columns" :data="tableData">
    <template #expand="{ row }">
      <p>State: {{ row.state }}</p>
      <p>City: {{ row.city }}</p>
      <p>Address: {{ row.address }}</p>
      <p>Zip: {{ row.zip }}</p>
    </template>
  </ElDynamicTable>
</template>

<script lang="ts" setup>
import { reactive } from '@vue/runtime-core'
import { ElDynamicTable } from '@element-plus/components/dynamic-table'

const columns = [
  {
    type: 'expand',
    slot: 'expand',
  },
  {
    label: 'Date',
    prop: 'date',
  },
  {
    label: 'Name',
    prop: 'name',
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
]
</script>

<style lang="scss" scoped></style>
