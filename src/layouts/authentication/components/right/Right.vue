<template>
  <div class="container">
    <Screenfull />
    <Theme />
    <avatar />
  </div>
</template>

<script>
import Screenfull from '@/components/Screenfull/index.vue'
import Avatar from './avatar'
import Theme from './Theme.vue'
export default {
  name: 'right',
  components: { Screenfull, Avatar, Theme },
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
