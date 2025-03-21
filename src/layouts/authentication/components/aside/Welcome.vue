<template>
  <div class="container" v-bind="$attrs">
    <img :src="avatar || '/favicon.ico'" class="avatar" alt="avatar" />
    <span class="content">{{ format }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const PREFIX = '你好! '
const SUBFIX = '欢迎登录。'
export default {
  name: 'Welcome',
  computed: {
    ...mapGetters(['avatar', 'nickname']),
    format() {
      return `${PREFIX}${this.nickname},${SUBFIX}`
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.85rem;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 100%;
  background-color: var(--el-fill-color);
  background-position: center;
  object-fit: fill;
}

.content {
  display: block;
  max-width: 100%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}
</style>
