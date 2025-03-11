<script setup lang="ts">
import useAuthStore from '@/store/auth'
import auth from '@/utils/auth'
import { reactive } from 'vue'

// State to toggle between login and signup
const signupForm = reactive({
  email: '',
  password: '',
  name: '',
  phone: '',
  specialist: '',
  birthDate: ''
})

const authStore = useAuthStore()

const router = useRouter()

const submitSignup = () => {
  console.log('Signup Form:', signupForm)
  // Add your signup logic here
  alert('Signup successful')
  router.push('/') // Navigate to the home/dashboard
}
const signupRules = {
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    { type: 'email' as const, message: 'Please input a valid email address', trigger: 'blur' }
  ],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
  name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
  phone: [
    { required: true, message: 'Please input phone number', trigger: 'blur' },
    { pattern: /^[0-9]+$/, message: 'Please input a valid phone number', trigger: 'blur' }
  ],
  specialist: [{ required: true, message: 'Please select your specialization', trigger: 'change' }],
  birthDate: [{ required: true, message: 'Please select your birth date', trigger: 'change' }]
}
</script>

<template>
  <div class="content">
    <div class="logo">
      <img src="@/assets/loginlogo.png" alt="logo" class="loginpic" />
      <h2>Doctor Panel</h2>
    </div>
    <div class="signupform">
      <h1 class="title">SIGNUP</h1>
      <el-form :model="signupForm" :rules="signupRules" size="large">
        <div class="contentbox">
          <!-- Left Column -->
          <div class="left">
            <h2 class="subtitle">Email</h2>
            <el-form-item prop="email">
              <el-input v-model="signupForm.email" placeholder="Enter your email" />
            </el-form-item>
            <h2 class="subtitle">Name</h2>
            <el-form-item prop="name">
              <el-input v-model="signupForm.name" placeholder="Enter your name" />
            </el-form-item>
            <h2 class="subtitle">Specialist</h2>
            <el-form-item prop="specialist">
              <el-select v-model="signupForm.specialist" placeholder="Select your specialization">
                <el-option label="Neurologist" value="Neurologist" />
                <el-option label="Cardiologist" value="Cardiologist" />
                <el-option label="Dermatologist" value="Dermatologist" />
              </el-select>
            </el-form-item>
          </div>

          <!-- Right Column -->
          <div class="right">
            <h2 class="subtitle">Password</h2>
            <el-form-item prop="password">
              <el-input v-model="signupForm.password" type="password" placeholder="Enter your password" />
            </el-form-item>
            <h2 class="subtitle">Phone Number</h2>
            <el-form-item prop="phone">
              <el-input v-model="signupForm.phone" placeholder="Enter your phone number" />
            </el-form-item>
            <h2 class="subtitle">Birth Date</h2>
            <el-form-item prop="birthDate">
              <el-date-picker v-model="signupForm.birthDate" placeholder="Select your birth date" />
            </el-form-item>
          </div>
        </div>
        <el-button type="primary" @click="submitSignup">Create Account</el-button>
        <div class="toggle-link">
          <span>Have an account already?<a @click.prevent="router.push('/login')"> Login</a></span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('@/styles/auth.scss');
</style>
