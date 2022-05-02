<template>
  <ElDynamicTable
    key="use-offset-pagination"
    v-loading="loading"
    :pagination="pagination"
    max-height="300px"
    :columns="columns"
    :data="tableData"
    stripe
    :border="true"
    highlight-current-row
  >
    <template #pageAside>
      <span>pageAside: {{ JSON.stringify(pagination) }}</span>
    </template>
  </ElDynamicTable>
  <ElButton type="primary" plain @click="addItem">Add item</ElButton>
  <ElButton type="danger" plain @click="delteItem">Delete item</ElButton>
  <!-- <ElButton @click="editItem">Edit item</ElButton> -->
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, nextTick } from 'vue'
import ElDynamicTable from '@element-plus/components/dynamic-table'

const columns = [
  {
    label: 'Id',
    prop: 'id',
  },
  {
    label: 'Name',
    prop: 'name',
  },
  {
    label: 'Email',
    prop: 'email',
  },
]

const tableData = ref([]) as any

const addItem = () => {
  tableData.value.push({
    id: tableData.value.length + 1,
    name: `user${tableData.value.length + 1}`,
  })
}
const delteItem = () => {
  tableData.value.shift()
}
const editItem = () => {
  tableData.value[0].name = 'edited name'
}
const pagination = reactive({
  currentPage: 1,
  pageSize: 20,
}) as any
setTimeout(() => {
  for (let i = 0; i < 80; i++)
    tableData.value.push({ id: i, name: `user ${i}` })
}, 1000)
// onMounted(() => {})
const loading = ref(false)
</script>

<style lang="scss"></style>
