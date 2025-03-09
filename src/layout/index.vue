<script setup lang="ts">
import AppHeader from './header/index.vue'
import AppMenu from './memu/index.vue'
import AppMain from './main/index.vue'
import { useRouter } from 'vue-router'
import { Menu } from '@element-plus/icons-vue'
import useAppStore from '@/store/app'
import { getMenuTree } from '@/utils/route'

const appStore = useAppStore()
const menuTree = getMenuTree()
const router = useRouter()
const isMenuCollapse = ref(false)
const isMobile = ref(window.innerWidth < 992)
const showMenu = ref(false)

window.addEventListener('resize', () => (isMobile.value = window.innerWidth < 992))

watch(
  () => router.currentRoute.value.fullPath,
  () => (showMenu.value = false)
)

const vDrag: Directive = {
  created(el) {
    el.onmousedown = event => {
      document.onselectstart = () => false
      const elX = event.clientX - el.offsetLeft
      const elY = event.clientY - el.offsetTop
      document.onmousemove = e => {
        el.style.left = `${Math.max(0, Math.min(e.clientX - elX, window.innerWidth - 50))}px`
        el.style.top = `${Math.max(0, Math.min(e.clientY - elY, window.innerHeight - 50))}px`
      }
      document.onmouseup = () => {
        document.onselectstart = null
        document.onmousemove = null
      }
    }
  }
}
</script>

<template>
  <div class="app-container">
    <!-- <div class="app-header">
      <app-header />
    </div> -->
    <el-container v-if="isMobile">
      <app-main />
      <div v-drag class="mobile-menu-button">
        <el-icon :size="30"><Menu /></el-icon>
        <el-drawer v-model="showMenu" direction="ltr">
          <app-menu :menu-tree="menuTree" />
        </el-drawer>
      </div>
    </el-container>

    <el-container v-else>
      <el-container>
        <el-main>
          <app-main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
// .el-header {
//   width: 100%;
// }
.el-main {
  height: 100vh;
  padding: 0;
}

.el-container {
  display: flex;
  background-color: #f3f8fd;
}

.el-aside {
  transition: width 0.3s;
}

.mobile-menu-button {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 10;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--el-color-primary);
  border-radius: 50%;
  cursor: pointer;
}

.default-menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 992px) {
  .el-container {
    flex-direction: column; /* Stack elements vertically on mobile */
  }

  .el-aside {
    width: 100%;
  }
}
.app-container {
  display: flex;
  flex-direction: column; /* Stack header and content vertically */
  height: 100vh; /* Full viewport height */
}
</style>
