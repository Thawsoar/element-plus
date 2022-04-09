<template>
  <ElDynamicTable
    :columns="columns"
    :data="tableData"
    max-height="250"
    :pagination="false"
  >
    <template #options="scope">
      <el-button
        type="text"
        size="small"
        @click.prevent="deleteRow(scope.$index)"
      >
        Remove
      </el-button>
    </template>
  </ElDynamicTable>
  <el-button class="mt-4" style="width: 100%" @click="onAddItem"
    >Add Item</el-button
  >
</template>

<script lang="ts" setup>
import { ref } from '@vue/runtime-core'
import dayjs from 'dayjs'
import { ElDynamicTable } from '@element-plus/components/dynamic-table'
const now = new Date()

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
  {
    label: 'Operations',
    slot: 'options',
    prop: 'options',
    width: 120,
    fixed: 'right',
  },
]

const tableData = ref([
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
])
const deleteRow = (index: number) => {
  tableData.value.splice(index, 1)
}

const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  })
}
</script>

<style lang="scss" scoped></style>
