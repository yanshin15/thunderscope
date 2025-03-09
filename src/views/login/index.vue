<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import useAuthStore from '@/store/auth'
import JSEncrypt from 'jsencrypt'
import useSso from '@/hooks/use-sso'
import auth from '@/utils/auth'
import i18nStore from '@/utils/i18n'
import { useI18n } from 'vue-i18n'
// const encryptor = new JSEncrypt()
// encryptor.setPublicKey(`MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzPy1UcwzgRT8dRUpAW0H
// eyVvIi4icqiwdBZMrh85+tJEZ/AXjELRzl89m2ZKoMHfoMDkajoxJeaL5IV9UpUl
// +1RqWvWqgYL0r859FyDeNg9kiMAfApyIowqFqctDx7k77jDopBvcX8F0shl6SUtE
// Vu96tc7+FrjP4OGwXJeB+b04O2SCV4mHxs8TRn7YsLoA10mjPNnsX0TiYkzSGUP/
// E5OEYt/ixNwO/lC6TdFM9PXRaTjF76e5qHw6ksJU74mb3A9/ZQCb4nzVw15xTxIa
// AnDX7+FqnCgpu26yXMLtVXyEa6CUvBjLLBleJ/cyHuUir7GYutf5LyuIEJPEWgnZ
// BwIDAQAB`)
import { ref, reactive } from 'vue'

// State to toggle between login and signup
const showLogin = ref(true) // Start with the login form
const signupForm = reactive({
  email: '',
  password: '',
  name: '',
  phone: '',
  specialist: '',
  birthDate: ''
})

const authStore = useAuthStore()
const loading = ref(false)
const formRef = ref<FormInstance>()
const form = reactive({ username: 'admin', password: '123456' })
const i18n = useI18n()

const router = useRouter()

const submitForm = () => {
  console.log('Username:', form.username)
  console.log('Password:', form.password)

  // Start loading state
  loading.value = true

  // Simulate validation logic
  if (form.username === 'admin' && form.password === '123456') {
    // Use the auth utility to set the token
    auth.setToken('example-token') // Replace 'example-token' with your actual token logic
    alert('Login successful')
    router.push('/') // Navigate to the home/dashboard
  } else {
    alert('Invalid credentials')
  }

  // End loading state
  loading.value = false
}

const enableI18n = import.meta.env.VITE_APP_ENABLE_I18N === 'true'
</script>

<template>
  <div class="content">
    <div class="logo">
      <img src="@/assets/loginlogo.png" alt="logo" class="loginpic" />
      <h2>Doctor Panel</h2>
    </div>
    <div v-if="showLogin" class="form">
      <h1 class="title">LOGIN TO ACCOUNT</h1>
      <el-form ref="formRef" :model="form" :rules="rules" size="large">
        <h2 class="subtitle">Email</h2>
        <el-form-item prop="username" label="">
          <el-input v-model="form.username">
            <template #prefix>
              <span style="width: 85px">{{ $t('login.username') }}</span>
            </template>
          </el-input>
        </el-form-item>
        <h2 class="subtitle">Password</h2>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password>
            <template #prefix>
              <span style="width: 85px">{{ $t('login.password') }}</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" :loading="loading" @click="submitForm">{{
            $t('login.submit')
          }}</el-button>
        </el-form-item>
        <div class="forgot-password">
          <a href="/forgot-password">Forgot password</a>
          <a @click.prevent="showLogin = false">Sign Up</a>
        </div>
      </el-form>
    </div>
    <div v-else class="signupform">
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
          <span>Have an account already?<a @click.prevent="showLogin = true"> Login</a></span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: linear-gradient(to bottom, #0034ee, #001d88);

  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    .loginpic {
      width: 80%;
      height: auto;
      margin-bottom: 10px;
    }

    h2 {
      color: white;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }
  }
  .forgot-password {
    display: flex;
    flex-direction: column; /* Arrange the links vertically */
    align-items: center; /* Center align the links horizontally */
    margin-top: 20px; /* Add spacing above the links */

    a {
      font-size: 16px; /* Set the font size */
      color: #0034ee; /* Set link color */
      text-decoration: none; /* Remove underline */

      &:hover {
        text-decoration: underline; /* Add underline on hover */
      }

      &:not(:last-child) {
        margin-bottom: 10px; /* Add spacing between the links */
      }
    }
  }

  .form,
  .signupform {
    width: 600px;
    padding: 40px;
    border-radius: 16px;
    backdrop-filter: blur(10px);
    background-color: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    .title {
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px;
    }

    .contentbox {
      display: flex; /* Enable flexbox for left and right columns */
      gap: 20px; /* Space between left and right sections */
      margin-bottom: 30px; /* Space below the contentbox */
    }

    .left,
    .right {
      flex: 1; /* Each column takes up equal width */
    }

    .left h2,
    .right h2 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .el-form-item {
      margin-bottom: 20px; /* Space between form items */
    }

    el-button {
      width: 100%;
      height: 60px;
      border-radius: 8px;
      font-size: 18px;
      background-color: #0034ee;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: #002cb2;
      }
    }

    .toggle-link {
      text-align: left;
      margin-top: 20px;

      a {
        font-size: 16px;
        color: #0034ee;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .signupform {
    width: 45%;
    height: 65%;
  }
}
</style>
