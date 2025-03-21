<template>
  <div class="container">
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>基本信息</span>
          <el-button type="warning" @click="visible = !visible">更新密码</el-button>
        </div>
      </template>
      <div class="card-content-container">
        <div class="card-avatar">
          <img class="card-avatar-img" :src="currentUser.avatar" alt="avatar" />
        </div>
        <div class="card-content">
          <div v-for="el in options" :key="el.field" class="card-content-item">
            <div class="card-content-item-label">
              <el-icon v-if="el.icon">
                <Icon :icon="el.icon" />
              </el-icon>
              <span>{{ el.label }}</span>
            </div>
            <span class="card-content-item-value">{{ currentUser[el.field] }}</span>
          </div>
          <div class="card-content-item" style="justify-content: flex-start; gap: 14px">
            <el-tag v-for="role in currentUser.roles" :key="role">{{ transformRole(role) }}</el-tag>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog
      v-model="visible"
      width="468px"
      title="更新密码"
      autocomplete="off"
      destroy-on-close
      append-to-body
      align-center
    >
      <el-form ref="formRef" label-position="right" label-width="auto" :model="form" :rules="rules">
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" placeholder="请输入新密码" clearable type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="submit" :loading="submitting">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Icon } from '@iconify/vue'
import { updatePassword } from '@/api/user'
import { ElMessage } from 'element-plus'

const roleMap = {
  root: '超级管理员',
  admin: '管理员',
  vip: 'VIP用户',
  user: '普通用户',
}
export default {
  components: { Icon },
  data() {
    return {
      options: [
        { field: 'username', label: '账户名', icon: 'codicon:account' },
        { field: 'nickname', label: '昵称', icon: 'icon-park-twotone:edit-name' },
      ],
      form: {
        newPassword: '',
      },
      rules: {
        newPassword: [{ required: true, message: '请输入新密码' }],
      },
      visible: false,
      submitting: false,
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    transformRole(role) {
      return roleMap[role] || '未知用户'
    },
    submit() {
      this.$refs.formRef.validate(isValid => {
        if (isValid) {
          this.submitting = true
          updatePassword({ userId: this.currentUser.id, newPassword: this.form.newPassword })
            .then(() => {
              ElMessage.success('更新密码成功')
              this.visible = false
            })
            .finally(() => (this.submitting = false))
        }
      })
    },
  },
  watch: {
    visible(v) {
      if (v) {
        this.form = { newPassword: '' }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  & > :nth-child(n + 1):not(:last-child) {
    margin-bottom: 12px;
  }
  h2 {
    margin: 0;
  }
  .card {
    max-width: 512px;
    .card-header {
      border-bottom: 1px solid var(--el-border-color);
      padding-bottom: 10px;
      font-weight: 500;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-content-container {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      .card-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        .card-avatar-img {
          object-fit: fill;
          border-radius: 100%;
          height: 96px;
          width: 96px;
          background-color: var(--el-fill-color);
        }
      }
      .card-content {
        flex: 1;
        flex-shrink: 0;
        font-size: 14px;
        & > :nth-child(n + 1):not(:last-child) {
          margin-bottom: 16px;
        }
        .card-content-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .card-content-item-label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
          }
          .card-content-item-value {
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
