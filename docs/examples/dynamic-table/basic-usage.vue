<template>
  <ElDynamicTable
    height="100%"
    :columns="columns"
    :table-data="tableData"
    :show-pagination="false"
    border
  >
    <template #edit="{ row }">
      <el-button type="text">编辑</el-button>
      <br />
      <el-input v-model="row.name"></el-input>
    </template>
    <template #slotHeader="{ column }">
      <span>插槽表头： {{ column.label }}</span>
    </template>
  </ElDynamicTable>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/runtime-core'
import { ElDynamicTable } from '@element-plus/components/dynamic-table'
export default defineComponent({
  components: {
    ElDynamicTable,
  },
  setup() {
    const columns = [
      {
        label: '姓名',
        prop: 'name',
      },
      {
        label: '年龄',
        prop: 'age',
        sortable: true,
      },

      {
        label: '编辑',
        prop: 'edit',
        slot: 'edit',
        fixed: 'right',
        width: 200,
      },
    ]
    const tableData = reactive([
      {
        name: '张三',
        age: 18,
        edit: '编辑',
      },
    ])
    return {
      tableData,
      columns,
    }
  },
})
</script>

<style lang="scss" scoped></style>
