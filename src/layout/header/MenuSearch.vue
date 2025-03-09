<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { useVueFuse } from 'vue-fuse'
import type { RouteRecordRaw } from 'vue-router'
import { getMenuTree } from '@/utils/route'

interface MenuNode {
  routeName: string
  title: string
}

function tree2List(tree: RouteRecordRaw[]): MenuNode[] {
  const list: MenuNode[] = []
  for (const node of tree) {
    const children = node.children
    if (!children || !children.length) {
      list.push({ routeName: String(node.name), title: node.meta?.title ?? '' })
    } else {
      for (const child of tree2List(children)) {
        child.title = node.meta?.title + ' - ' + child.title
        list.push(child)
      }
    }
  }
  return list
}

const { search, results } = useVueFuse(tree2List(getMenuTree()), {
  shouldSort: true,
  threshold: 0.3,
  keys: [
    { name: 'title', weight: 0.9 },
    { name: 'routeName', weight: 0.1 }
  ]
})

const value = ref('')
const router = useRouter()

const go = (name: string) => {
  router.push({ name })
  value.value = ''
  results.value.splice(0) // Clear results after navigation
}
</script>

<template>
  <!-- Always Visible Search Bar -->
  <div style="position: relative; width: 100%; max-width: 500px; margin: 0 auto">
    <el-input
      v-model="value"
      placeholder="Search data..."
      prefix-icon="Search"
      style="border-radius: 8px; background: #e9effc; color: black"
      @update:model-value="(v: string) => (search = v)"
    >
      <template #append>
        <el-button :icon="Search" style="color: black" @click="handleSearch" />
      </template>
    </el-input>
    <!-- Search Results Dropdown -->
    <div
      v-if="results.length"
      style="
        position: absolute;
        top: 45px;
        left: 0;
        right: 0;
        background: #e9effc;
        border: 1px solid #ccc;
        z-index: 1000;
        border-radius: 4px;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
      "
    >
      <div v-for="item in results" :key="item.routeName" class="search-result" @click="go(item.routeName)">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-result {
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-result:hover {
  background-color: #e9effc;
}
</style>
