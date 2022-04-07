<template>
  <el-radio-group v-model="tableLayout">
    <el-radio-button label="left" />
    <el-radio-button label="center" />
    <el-radio-button label="right" />
  </el-radio-group>
  <ElDynamicTable :columns="columns" :data="tableData" :align="tableLayout" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElDynamicTable } from '@element-plus/components/dynamic-table'

const tableLayout = ref('fixed')
const columns = [
  {
    label: 'Date',
    prop: 'date',
  },
  {
    label: 'Name',
    prop: 'name',
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
