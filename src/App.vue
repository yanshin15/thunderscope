<script setup lang="ts">
import * as locales from 'element-plus/es/locale/index'
import useAppStore from './store/app'
import { useI18n } from 'vue-i18n'
const appStore = useAppStore()
const i18n = useI18n()

const locale = ref()
// 初始化自定义主题色

watch(
  i18n.locale,
  (value, oldValue) => {
    let localeLowerCase = value.toLowerCase()
    locale.value = Object.values(locales).find(e => e.name === localeLowerCase)
    if (locale.value == null && localeLowerCase.includes('-')) {
      localeLowerCase = localeLowerCase.split('-')[0]
      locale.value = Object.values(locales).find(e => e.name === localeLowerCase)
    }
    if (locale.value == null) {
      locale.value = Object.values(locales).find(e => e.name === i18n.fallbackLocale.value)
    }
    oldValue && oldValue !== value && window.location.reload()
  },
  {
    immediate: true
  }
)
</script>

<template>
  <el-config-provider :locale="locale" :size="appStore.globalSize">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss">
html,
body {
  font-family: 'SF Pro Display', sans-serif;
}
body {
  width: 100% !important;
  margin: 0;
  padding: 0 !important;
  overflow: hidden;
}
</style>
