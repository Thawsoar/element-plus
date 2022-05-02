<template>
  <ElDynamicTable
    key="pagination"
    v-model:pagination="pagination"
    v-loading="loading"
    max-height="300px"
    :columns="columns"
    :data="tableData"
    stripe
    :border="true"
    highlight-current-row
    @page-change="handlePageChange"
  >
  </ElDynamicTable>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ElDynamicTable from '@element-plus/components/dynamic-table'

const columns = [
  {
    label: 'Phone',
    prop: 'phone',
  },
  {
    label: 'Gender',
    prop: 'gender',
  },
  {
    label: 'Email',
    prop: 'email',
  },
]
const tableData = ref([]) as any

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
}) as any
const loading = ref(false)
const getRandomuserParams = (params: any) => ({
  results: params.pageSize,
  page: params.current,
  ...params,
})

const fetch = (params?: any) => {
  loading.value = true

  const u = new URLSearchParams(getRandomuserParams(params) as any).toString()

  window
    .fetch(`https://randomuser.me/api?${u}`, {
      method: 'GET', // or 'PUT'
    })
    .then((res) => res.json())
    .catch((error) => console.error('Error:', error))
    .then((response) => {
      loading.value = false
      tableData.value = response.results
      pagination.value = {
        total: 200,
        currentPage: params.currentPage,
        pageSize: params.pageSize,
        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      }
    })
}

const handlePageChange = (val: any) => {
  fetch({
    currentPage: val.currentPage,
    pageSize: val.pageSize,
  })
}

onMounted(() => {
  fetch(pagination.value)
})
</script>

<style lang="scss"></style>
