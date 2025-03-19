<template>
  <el-config-provider size="default" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script>
import Cookies from 'js-cookie'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default {
  name: 'App',
  data() {
    return {
      zhCn,
    }
  },
  mounted() {
    const isDark = Cookies.get('leave-school-system-theme') === 'dark'
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  },
}
</script>

<style></style>
