<template>
  <ElTooltip content="主题">
    <ElIcon class="theme-icon">
      <Sunny @click="toogle" v-if="isDark" />
      <Moon @click="toogle" v-else />
    </ElIcon>
  </ElTooltip>
</template>

<script>
import { Sunny, Moon } from '@element-plus/icons-vue'
import { ElIcon, ElTooltip } from 'element-plus'
import Cookies from 'js-cookie'

export default {
  name: 'theme',
  components: { Sunny, Moon, ElIcon, ElTooltip },
  data() {
    return { isDark: Cookies.get('leave-school-system-theme') === 'dark' }
  },
  methods: {
    toogle() {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark')
      if (this.isDark) {
        Cookies.set('leave-school-system-theme', 'dark')
      } else {
        Cookies.remove('leave-school-system-theme')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.theme-icon {
  cursor: pointer;
  height: fit-content;
}
</style>
