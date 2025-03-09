<template>
  <div class="sidebar">
    <nav>
      <div class="sidebox">
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.name"
            :class="{ selected: selectedItem === item.name }"
            @click="selectItem(item.name), $router.push(item.route)"
          >
            <router-link :to="item.route" class="nav-item">
              <span class="item-text">{{ item.name }}</span>
              <span class="item-count">{{ item.count }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Divider -->
      <div class="divider" />

      <!-- To-Do Section -->
      <div class="todo-section">
        <router-link to="/todo" class="nav-item">
          <img src="@/assets/menu/submenu.png" alt="submenu-icon" class="todo-icon" />
          <span class="item-text">To Do List</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: '',
      menuItems: [
        { name: 'All cases', route: '/cases', count: 27 },
        { name: 'High priority', route: '/summary', count: 0 },
        { name: 'In preparations', route: '/notifications', count: 1 },
        { name: 'For review', route: '/completed', count: 1 },
        { name: 'Finished', route: '/patient', count: 0 }
      ]
    }
  },
  watch: {
    $route() {
      this.updateSelectedItem()
    }
  },
  mounted() {
    this.updateSelectedItem()
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item
    },
    updateSelectedItem() {
      const routeMap = this.menuItems.reduce((acc, item) => {
        acc[item.route] = item.name
        return acc
      }, {})
      this.selectedItem = routeMap[this.$route.path] || ''
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 13%;
  min-width: 270px;
  height: 100vh;
  padding: 5px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  width: 90%;
  padding: 15px 20px;
  cursor: pointer;
  border-radius: 30px;
  transition:
    background-color 0.3s,
    color 0.3s;
  user-select: none;
  box-sizing: border-box;
  color: #666;
  display: flex;
  justify-content: space-between; /* Ensures number is aligned to the right */
  align-items: center;
}

nav ul li.selected {
  background-color: #0034ee;
  color: #fff;
}

nav ul li .nav-item {
  color: inherit;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
}

.item-text {
  flex: 1; /* Ensures text takes available space */
}

.item-count {
  font-weight: bold;
}
.divider {
  border-top: 1px solid #ccc;
  margin: 20px 0;
}
h2 {
  margin: 10px 0;
  margin-left: 20px;
}
.sidebox {
  margin-top: 20px;
}

.divider {
  border-top: 1px solid #ccc;
  margin: 20px 0;
}

.todo-section {
  padding: 15px 20px;
  cursor: pointer;
  border-radius: 30px;
  transition:
    background-color 0.3s,
    color 0.3s;
  user-select: none;
  box-sizing: border-box;
}

.todo-section .nav-item {
  color: inherit;
  text-decoration: none;
  font-size: 16px;
  display: flex;
  align-items: center; /* Align icon and text */
  gap: 10px; /* Space between icon and text */
}

.todo-icon {
  height: 20px; /* Adjust to match the reference image */
  width: auto;
}
</style>
