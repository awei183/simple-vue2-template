<template>
  <ElDropdown @command="onCommand">
    <div class="container">
      <img :src="avatar || '/favicon.ico'" class="avatar" alt="avatar" />
      <span class="username">{{ username || 'User' }}</span>
      <ElIcon>
        <ArrowDown />
      </ElIcon>
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem command="profile">
          <ElIcon>
            <User />
          </ElIcon>
          <span>个人中心</span>
        </ElDropdownItem>
        <ElDropdownItem divided command="logout">
          <ElIcon class="logout-icon">
            <SwitchButton />
          </ElIcon>
          <span>退出登录</span>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script>
import { ArrowDown } from '@element-plus/icons-vue'
import { ElDropdown, ElIcon } from 'element-plus'
import { SwitchButton, User } from '@element-plus/icons-vue'
import { mapGetters } from 'vuex'
export default {
  name: 'avatar',
  components: { ArrowDown, ElDropdown, ElIcon, SwitchButton, User },
  data() {
    return {
      user: {
        avatar: '/favicon.ico',
        username: 'User',
      },
    }
  },
  computed: {
    ...mapGetters(['avatar', 'username']),
  },
  methods: {
    onCommand(command) {
      if (command === 'profile') {
        this.$router.push('/profile')
      }
      if (command === 'logout') {
        this.$store.dispatch('user/logout').then(() => {
          this.$router.replace('/login')
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  outline: none !important;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background-color: var(--el-fill-color);
  background-position: center;
  object-fit: fill;
}

.username {
  font-weight: 500;
}

.logout-icon {
  color: var(--el-color-danger);
}
</style>
