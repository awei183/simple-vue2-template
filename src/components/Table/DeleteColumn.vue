<template>
  <el-button v-bind="$attrs" type="danger" plain size="small" @click="confirm">删除</el-button>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  name: 'DeleteColumn',
  emits: ['success'],
  props: {
    promise: {
      type: Function,
      required: true,
    },
    ids: {
      type: Array,
      required: true,
    },
  },
  methods: {
    confirm() {
      ElMessageBox.confirm('你确定删除该数据吗？', '删除提示', {
        type: 'error',
        autofocus: false,
        confirmButtonClass: 'el-button--danger',
      })
        .then(() => this.promise(this.ids))
        .then(() => {
          ElMessage.success('成功')
          this.$emit('success')
        })
        .catch(() => void 0)
    },
  },
}
</script>

<style lang="scss" scoped></style>
