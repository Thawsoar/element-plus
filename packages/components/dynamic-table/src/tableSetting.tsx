import { defineComponent, onMounted, ref } from 'vue'
import ElDialog from '@element-plus/components/dialog'

const TableSetting = defineComponent({
  name: 'TableSetting',
  components: {
    ElDialog,
  },
  props: {
    columnOptions: {
      type: Array,
      default: () => [],
    },
    hideColumns: {
      // 需要隐藏的列，label名称
      type: Array,
      default: () => [],
    },
  },
  emits: ['confirm'],
  setup(props, { emit, attrs }) {
    const isIndeterminate = ref(true)
    const checkAll = ref(false)
    const checkedColumns = ref([]) as any
    const excludeHideColumns = ref([]) as any // 排除需要隐藏的列
    const initCheckedColumns = () => {
      checkAll.value = true
      isIndeterminate.value = false
      excludeHideColumns.value = props.columnOptions.filter(
        (column: any) => !props.hideColumns.includes(column.label)
      )
      checkedColumns.value = excludeHideColumns.value.map((item) => item.label)
    }
    function handleCheckAllChange(val) {
      if (val) {
        checkedColumns.value = props.columnOptions.map(
          (item: any) => item.label
        )
      } else {
        checkedColumns.value = []
      }
      isIndeterminate.value = false
    }
    function handleCheckedColumnChange(value) {
      const checkedCount = value.length
      checkAll.value = checkedCount === props.columnOptions.length
      isIndeterminate.value =
        checkedCount > 0 && checkedCount < props.columnOptions.length
    }
    function handleConfirm() {
      emit('confirm', checkedColumns.value)
    }
    onMounted(() => {
      initCheckedColumns()
    })
    return () => (
      <el-dialog title="表格设置" {...attrs}>
        <div class="table-setting-item">
          <p class="table-setting-item-title">字段显示设置</p>
          <div class="table-setting-item-content">
            <el-checkbox
              indeterminate={isIndeterminate.value}
              v-model={checkAll.value}
              onChange={handleCheckAllChange}
              style="margin-bottom:10px;"
            >
              全选
            </el-checkbox>

            <el-checkbox-group
              v-model={checkedColumns.value}
              onChange={handleCheckedColumnChange}
            >
              {excludeHideColumns.value.map((item) => {
                return item.label ? (
                  <el-checkbox
                    label={item.label}
                    key={item.label}
                    style="margin-bottom:10px;"
                  >
                    {item.label}
                  </el-checkbox>
                ) : null
              })}
            </el-checkbox-group>
          </div>
        </div>
        <div v-slots="footer">
          <el-button onClick={handleConfirm} type="primary">
            确定
          </el-button>
        </div>
      </el-dialog>
    )
  },
})

export default TableSetting
