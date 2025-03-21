<template>
  <div>
    <span class="welcome-title">欢迎回来! {{ nickname }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'demo',
  computed: {
    ...mapGetters(['nickname']),
  },
}
</script>

<style lang="scss" scoped>
.welcome-title {
  display: block;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 1rem;
}
</style>
