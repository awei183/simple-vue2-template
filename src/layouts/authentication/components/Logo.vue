<template>
  <div class="container" @click="goHome">
    <img class="logo" src="/favicon.ico" />
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script>
import defaultSettings from '@/settings'

export default {
  name: 'logo',
  data() {
    return {
      title: defaultSettings.title,
    }
  },
  methods: {
    goHome() {
      this.$router.replace('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 1rem;
  cursor: pointer;
  .logo {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    background-color: var(--el-fill-color);
    background-position: center;
    object-fit: fill;
  }
  .title {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 24px;
    font-weight: 500;
    user-select: none;
  }
}
</style>
