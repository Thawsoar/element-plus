<template>
  <ElDynamicTable
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
    <template #pageAside>
      <div class="my-4">
        <ElButton :disabled="isFirstPage" size="small" @click="prev"
          >prev</ElButton
        >
        <ElButton
          v-for="item in pageCount"
          :key="item"
          size="small"
          :disabled="currentPage === item"
          @click="currentPage = item"
        >
          {{ item }}
        </ElButton>
        <ElButton :disabled="isLastPage" size="small" @click="next"
          >next</ElButton
        >
      </div>
    </template>
  </ElDynamicTable>
  <div style="display: flex; justify-content: space-between; width: 100%">
    <div>total: {{ pagination.total }}</div>
    <div>pageCount: {{ pageCount }}</div>
    <div>currentPageSize: {{ currentPageSize }}</div>
    <div>currentPage: {{ currentPage }}</div>
    <div>isFirstPage: {{ isFirstPage }}</div>
    <div>isLastPage: {{ isLastPage }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { useOffsetPagination } from '@vueuse/core'
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

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 50,
}) as any
const loading = ref(false)
const getRandomuserParams = (params: any) => ({
  results: params.currentPageSize || params.pageSize,
  page: params.currentPage,
})

const fetchData = (params?: any) => {
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
      // mock
      pagination.total = 50
    })
}

const {
  currentPage,
  currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total: pagination.total,
  page: pagination.currentPage,
  pageSize: 10,
  onPageChange: fetchData,
  onPageSizeChange: fetchData,
})
const handlePageChange = (val: any) => {
  currentPage.value = val.currentPage
  currentPageSize.value = val.pageSize
}
onMounted(() => {
  fetchData(pagination)
})
</script>

<style lang="scss"></style>
