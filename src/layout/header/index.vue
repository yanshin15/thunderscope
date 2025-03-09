<script setup lang="ts">
import { ArrowDown, Search, UserFilled } from '@element-plus/icons-vue'
import { isDark, isSmall } from '@/utils/theme'
import MessageBell from './message-bell/index.vue'
import MenuSearch from './MenuSearch.vue'
import useAuthStore from '@/store/auth'
import Logo from '@/assets/logo.png'
import useAppStore from '@/store/app'
import LightIcon from '@/assets/icon/light.vue'
import DarkIcon from '@/assets/icon/dark.vue'
import i18n from '@/utils/i18n'
import auth from '@/utils/auth'
import { Setting } from '@element-plus/icons-vue'

const authStore = useAuthStore()
const router = useRouter()
const enableI18n = import.meta.env.VITE_APP_ENABLE_I18N === 'true'

const logout = async () => {
  await auth.clearToken() // Clear the token
  router.push({ name: 'Login' }) // Redirect to the login page
}

const goPersonal = () => {
  router.push({ name: 'Personal' }).finally()
}
</script>

<template>
  <div class="header-container">
    <!-- Logo & App Name -->
    <div style="display: flex; align-items: center">
      <span style="color: white; font-size: 1.6rem">CASES</span>
    </div>

    <!-- Right Section -->
    <div style="display: flex; align-items: center; gap: 15px">
      <!-- Profile Dropdown -->
      <div class="imagecontainer">
        <img src="@/assets/menu/logo.png" alt="logo" style="height: 30px; margin-right: 10px" />
      </div>
      <!-- Divider Line -->
      <div class="divider" />
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img src="@/assets/menu/setting.png" alt="settings" class="settings-icon" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goPersonal">Profile</el-dropdown-item>
            <el-dropdown-item @click="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  position: absolute; /* Ignore parent padding/margin */
  left: 0;
  top: 0;
  width: 100vw;
  height: 70px;
  background: linear-gradient(to right, #0e214f, #1f4cb5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px; /* This will not be affected by parent padding */
  box-sizing: border-box;
  z-index: 1000; /* Ensure it's above other content */
}
.el-input {
  width: 100%;
  border-radius: 8px;
}
.el-dropdown {
  color: E9EFFC;
}

.el-dropdown {
  color: white;
}

.el-dropdown-link {
  margin-right: 15px;
}

.divider {
  position: absolute;
  left: 96%; /* Adjust based on your layout */
  transform: translateX(-50%);
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white */
  z-index: 999; /* Ensures it appears properly */
}
</style>
