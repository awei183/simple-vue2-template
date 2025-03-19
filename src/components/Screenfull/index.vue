<template>
  <el-tooltip content="全屏">
    <el-icon class="container" @click="click"><FullScreen /></el-icon>
  </el-tooltip>
</template>

<script>
import screenfull from 'screenfull'
import { ElIcon, ElMessage, ElTooltip } from 'element-plus'
import { FullScreen } from '@element-plus/icons-vue'

export default {
  name: 'Screenfull',
  components: { ElIcon, FullScreen, ElTooltip },
  data() {
    return {
      isFullscreen: false,
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    click() {
      if (!screenfull.isEnabled) {
        ElMessage({
          message: 'you browser can not work',
          type: 'warning',
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    },
  },
}
</script>

<style scoped></style>
