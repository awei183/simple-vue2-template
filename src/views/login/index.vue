<template>
  <div class="container">
    <div class="main">
      <div class="img">
        <Illustration />
      </div>
      <div class="form_container">
        <h1 class="title">{{ title }}</h1>
        <el-form ref="formRef" class="login_form" label-width="auto" :rules="rules" :model="form">
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="请输入用户名" v-model="form.username">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" type="password" show-password v-model="form.password">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-button type="primary" class="login_btn" @click="onSubmit" :loading="loading">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import defaultSettings from '@/settings'
import { User, Lock } from '@element-plus/icons-vue'
import { toRaw } from 'vue'
import Illustration from '@/assets/illustration.svg?component'

export default {
  name: 'login',
  components: {
    User,
    Lock,
    Illustration,
  },
  data: () => {
    return {
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }],
      },
      form: {
        username: '',
        password: '',
      },
      loading: false,
      title: defaultSettings.title,
    }
  },
  methods: {
    onSubmit() {
      this.$refs.formRef.validate(isValid => {
        if (isValid) {
          this.loading = true
          this.$store
            .dispatch('user/login', toRaw(this.form))
            .then(() => {
              const { redirect = '/' } = Object.fromEntries(new URLSearchParams(location.href).entries())
              this.$router.push({ path: redirect })
              this.loading = false
            })
            .catch(err => {
              this.loading = false
            })
        }
      })
    },
  },
}
</script>

<style scoped>
.container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(/login/bg.png);
}
.main {
  display: flex;
  align-items: center;
  gap: 10rem;
}
.form_container {
  width: 384px;
  min-height: 0;
}
.login_form {
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  padding: 2.5rem;
  box-shadow: var(--el-box-shadow);
}
.login_form > :nth-child(n + 1):not(:last-child) {
  margin-bottom: 2rem;
}
.title {
  color: var(--el-text-color-primary);
  margin-top: 0px;
  margin-bottom: 2rem;
  font-size: 32px;
  text-align: center;
}
.login_btn {
  width: 100%;
}
</style>
