<template>
  <ElDynamicTable
    :columns="columns"
    :data="tableData"
    :pagination="false"
    :hide-columns="hideColumns"
  />
  <ElButton @click="setHideColumns()">显示全部</ElButton>
  <ElButton @click="setHideColumns(['sex', 'age'])">隐藏性别年龄</ElButton>
</template>

<script lang="ts" setup>
import { reactive, ref } from '@vue/runtime-core'
import { ElDynamicTable } from '@element-plus/components/dynamic-table'

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
    hide: true,
  },
  {
    label: 'Sex',
    prop: 'sex',
  },
  {
    label: 'Age',
    prop: 'age',
  },
  {
    label: 'Grade',
    prop: 'grade',
  },
]
const hideColumns = ref([]) as any
const setHideColumns = (value: any = []) => (hideColumns.value = value)

const tableData = reactive([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    sex: 'man',
    age: '18',
    grade: '3',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    sex: 'man',
    age: '18',
    grade: '3',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    sex: 'man',
    age: '18',
    grade: '3',
  },
])
</script>

<style lang="scss" scoped></style>
