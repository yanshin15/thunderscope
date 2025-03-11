<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import useAuthStore from '@/store/auth'
import auth from '@/utils/auth'
import { ref, reactive } from 'vue'

const formRef = ref<FormInstance>()
const form = reactive({ email: 'admin@gmail.com', password: '123456' })
const authStore = useAuthStore()
const router = useRouter()

const submitForm = async () => {
  const response = await authStore.login(form)
  if (response) {
    router.push('/')
  }
}

const rules = {
  email: [{ required: true, message: 'Please enter email', trigger: 'blur' }],
  password: [{ required: true, message: 'Please enter password', trigger: 'blur' }]
}
</script>
<template>
  <div class="content">
    <div class="logo">
      <img src="@/assets/loginlogo.png" alt="logo" class="loginpic" />
      <h2>Doctor Panel</h2>
    </div>
    <div class="form">
      <h1 class="title">LOGIN TO ACCOUNT</h1>
      <el-form ref="formRef" :model="form" :rules="rules" size="large">
        <h2 class="subtitle">Email</h2>
        <el-form-item prop="email" label="">
          <el-input v-model="form.email">
            <template #prefix>
              <el-icon class="back-icon"><el-icon-message /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <h2 class="subtitle">Password</h2>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password>
            <template #prefix>
              <el-icon class="back-icon"><el-icon-lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <span class="error-message">{{ authStore.errorMessage ?? '' }}</span>
        <el-button class="mt-2 loginbtn" :loading="authStore.loading" @click="submitForm"> Login to Account </el-button>
        <el-row class="row-bg" justify="space-between">
          <el-col :span="12">
            <div class="toggle-link">
              <span>Don't have an account?<a @click.prevent="router.push('/register')"> Sign Up</a></span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="toggle-link">
              <span><a @click.prevent="router.push('/forgot-password')">Forgot password</a></span>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url('@/styles/auth.scss');
</style>
