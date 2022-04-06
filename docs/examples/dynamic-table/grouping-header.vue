<template>
  <ElDynamicTable :columns="columns" :data="tableData" />
</template>

<script lang="ts" setup>
import { reactive } from '@vue/runtime-core'
import { ElDynamicTable } from '@element-plus/components/dynamic-table'

const columns = [
  {
    label: 'Date',
    prop: 'date',
    width: 180,
  },
  {
    label: 'Delivery Info',
    children: [
      {
        label: 'Name',
        prop: 'name',
        width: 180,
      },
      {
        label: 'Address Info',
        children: [
          {
            label: 'City',
            prop: 'city',
            width: 180,
          },
          {
            label: 'State',
            prop: 'state',
            width: 180,
          },
          {
            label: 'Zip',
            prop: 'zip',
            width: 180,
          },
        ],
      },
    ],
  },
]

const tableData = reactive([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
])
</script>

<style lang="scss" scoped></style>
