<script setup lang="ts" name="Package">
import { ref, computed, onMounted } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { getdocs } from '@/utils/api'
import { deletedoc } from '@/utils/api'
import path1 from '@/assets/eye/panel1.png'
import path2 from '@/assets/eye/panel2.png'
import AppMenu from '@/layout/memu/index.vue'
import { getMenuTree } from '@/utils/route'
import auth from '@/utils/auth'
const route = useRoute()
const router = useRouter()

const openInViewer = () => {
  router.push('/slide')
}

import dayjs from 'dayjs'

const dateRange = ref([dayjs().format('YYYY-MM-DD'), dayjs().add(7, 'day').format('YYYY-MM-DD')])

const cases = ref([
  {
    id: '1',
    pathologist: { name: 'Dr. Lee K.', initials: 'LK' },
    patient: 'Cedar Pete',
    birthdate: '24 Nov, 1990 (26yo)',
    gender: 'Male',
    lastUpdate: '10 Nov, 2024 - 10:00 AM',
    status: 'FOR REVIEW',
    type: 'Left & Right',
    slides: 2,
    images: [path1, path1]
  },
  {
    id: '2',
    pathologist: { name: 'Jong Un', initials: 'JU' },
    patient: 'Kim Sun Tzu',
    birthdate: '24 Dec, 1990 (34yo)',
    gender: 'Female',
    lastUpdate: '12 Oct, 2024 - 10:00 AM',
    status: 'COMPLETED',
    type: 'Left & Right',
    slides: 3,
    images: [path1, path2, path2]
  },
  {
    id: '3',
    pathologist: { name: 'Dr. Lee K.', initials: 'LK' },
    patient: 'Cedar Pete',
    birthdate: '24 Nov, 1990 (26yo)',
    gender: 'Male',
    lastUpdate: '10 Nov, 2024 - 10:00 AM',
    status: 'FOR REVIEW',
    type: 'Left & Right',
    slides: 2,
    images: [path1, path1]
  },
  {
    id: '4',
    pathologist: { name: 'Dr. Lee K.', initials: 'LK' },
    patient: 'Cedar Pete',
    birthdate: '24 Nov, 1990 (26yo)',
    gender: 'Male',
    lastUpdate: '10 Nov, 2024 - 10:00 AM',
    status: 'FOR REVIEW',
    type: 'Left & Right',
    slides: 2,
    images: [path1, path1]
  },
  {
    id: '5',
    pathologist: { name: 'Jong Un', initials: 'JU' },
    patient: 'Kim Sun Tzu',
    birthdate: '24 Dec, 1990 (34yo)',
    gender: 'Female',
    lastUpdate: '12 Oct, 2024 - 10:00 AM',
    status: 'COMPLETED',
    type: 'Left & Right',
    slides: 2,
    images: [path1, path1]
  },
  {
    id: '6',
    pathologist: { name: 'Dr. Lee K.', initials: 'LK' },
    patient: 'Cedar Pete',
    birthdate: '24 Nov, 1990 (26yo)',
    gender: 'Male',
    lastUpdate: '10 Nov, 2024 - 10:00 AM',
    status: 'FOR REVIEW',
    type: 'Left & Right',
    slides: 2,
    images: [path1, path1]
  },
  {
    id: '7',
    pathologist: { name: 'Jong Un', initials: 'JU' },
    patient: 'Kim Sun Tzu',
    birthdate: '24 Dec, 1990 (34yo)',
    gender: 'Female',
    lastUpdate: '12 Oct, 2024 - 10:00 AM',
    status: 'COMPLETED',
    type: 'Left & Right',
    slides: 2,
    images: [path1, path1]
  },
  {
    id: '8',
    pathologist: { name: 'Dr. Lee K.', initials: 'LK' },
    patient: 'Cedar Pete',
    birthdate: '24 Nov, 1990 (26yo)',
    gender: 'Male',
    lastUpdate: '10 Nov, 2024 - 10:00 AM',
    status: 'FOR REVIEW',
    type: 'Left & Right',
    slides: 2,
    images: [path1, path1]
  },
  {
    id: '9',
    pathologist: { name: 'Jong Un', initials: 'JU' },
    patient: 'Kim Sun Tzu',
    birthdate: '24 Dec, 1990 (34yo)',
    gender: 'Female',
    lastUpdate: '12 Oct, 2024 - 10:00 AM',
    status: 'COMPLETED',
    type: 'Left & Right',
    slides: 2,
    images: [path1, path1]
  },
  {
    id: '10',
    pathologist: { name: 'Dr. Lee K.', initials: 'LK' },
    patient: 'Cedar Pete',
    birthdate: '24 Nov, 1990 (26yo)',
    gender: 'Male',
    lastUpdate: '10 Nov, 2024 - 10:00 AM',
    status: 'FOR REVIEW',
    type: 'Left & Right',
    slides: 2,
    images: [path1, path1]
  },
  {
    id: '11',
    pathologist: { name: 'Jong Un', initials: 'JU' },
    patient: 'Kim Sun Tzu',
    birthdate: '24 Dec, 1990 (34yo)',
    gender: 'Female',
    lastUpdate: '12 Oct, 2024 - 10:00 AM',
    status: 'COMPLETED',
    type: 'Left & Right',
    slides: 2,
    images: [path1, path2]
  }
])
const logout = async () => {
  await auth.clearToken() // Clear the token
  router.push({ name: 'Login' }) // Redirect to the login page
}
// Resolve images dynamically
const resolvedCases = computed(() => {
  return cases.value.map(caseItem => ({
    ...caseItem,
    images: caseItem.images.map(imagePath => new URL(`../assets/${imagePath}`, import.meta.url).href)
  }))
})

const selectedState = ref('All State')
const selectedClinic = ref('All Clinic')
const selectedGender = ref('All Gender')
const selectedAge = ref('All Age')
const selectedPackage = ref('All Package')

const states = ref(['California', 'Texas', 'New York', 'Florida', 'Illinois'])

// Pagination setup
const casesPerPage = 10
const currentPage = ref(1)

// Computed property to get paginated data
const paginatedCases = computed(() => {
  const start = (currentPage.value - 1) * casesPerPage
  const end = start + casesPerPage
  return cases.value.slice(start, end)
})

// Pagination controls
const totalPages = computed(() => Math.ceil(cases.value.length / casesPerPage))

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const startIndex = computed(() => (currentPage.value - 1) * casesPerPage + 1)
const endIndex = computed(() => Math.min(currentPage.value * casesPerPage, cases.value.length))

// Selected rows state
const selectedCases = ref<string[]>([])

// Toggle case selection
const toggleSelection = (id: string) => {
  if (selectedCases.value.includes(id)) {
    selectedCases.value = selectedCases.value.filter(caseId => caseId !== id)
  } else {
    selectedCases.value.push(id)
  }
}

const isMenuCollapse = ref(false)
const menuTree = getMenuTree()
</script>

<template>
  <div class="app-container">
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
              <el-dropdown-item @click="router.push('/personal')">Profile</el-dropdown-item>
              <el-dropdown-item @click="logout">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="divide">
      <div class="cases-header">
        <div class="cases-title">
          <h2>All cases <span class="case-count">(27)</span></h2>
        </div>
        <button class="new-test-btn">
          <el-icon><Plus /></el-icon> Start New Test
        </button>
      </div>
    </div>
    <div class="dividebot">
      <app-menu v-model:collapse="isMenuCollapse" :menu-tree="menuTree" />
      <div class="dashboard-content">
        <!-- Move the Cases Header to the top -->

        <div class="dashboard-container">
          <!-- <app-menu v-model:collapse="isMenuCollapse" :menu-tree="menuTree" /> -->
          <!-- Page Header -->
          <!-- All Cases Section (Newly Added) -->
          <div class="filters-container">
            <div class="custom-dropdown-container">
              <label class="dropdown-label">State</label>
              <div class="dropdown-wrapper">
                <select v-model="selectedState" class="custom-dropdown">
                  <option value="All State">All State</option>
                  <option v-for="(state, index) in states" :key="index" :value="state">{{ state }}</option>
                </select>
                <img class="dropdown-icon" src="@/assets/down.png" alt="logo" />
              </div>
            </div>

            <div class="custom-dropdown-container">
              <label class="dropdown-label">Clinic</label>
              <div class="dropdown-wrapper">
                <select v-model="selectedState" class="custom-dropdown">
                  <option value="All State">All Clinic</option>
                  <option v-for="(state, index) in states" :key="index" :value="state">{{ state }}</option>
                </select>
                <img class="dropdown-icon" src="@/assets/down.png" alt="logo" />
              </div>
            </div>

            <div class="custom-dropdown-container">
              <label class="dropdown-label">Gender</label>
              <div class="dropdown-wrapper">
                <select v-model="selectedState" class="custom-dropdown">
                  <option value="All State">All Gender</option>
                  <option v-for="(state, index) in states" :key="index" :value="state">{{ state }}</option>
                </select>
                <img class="dropdown-icon" src="@/assets/down.png" alt="logo" />
              </div>
            </div>

            <div class="custom-dropdown-container">
              <label class="dropdown-label">Age</label>
              <div class="dropdown-wrapper">
                <select v-model="selectedState" class="custom-dropdown">
                  <option value="All State">All Age</option>
                  <option v-for="(state, index) in states" :key="index" :value="state">{{ state }}</option>
                </select>
                <img class="dropdown-icon" src="@/assets/down.png" alt="logo" />
              </div>
            </div>

            <div class="custom-dropdown-container">
              <label class="dropdown-label">Package</label>
              <div class="dropdown-wrapper">
                <select v-model="selectedState" class="custom-dropdown">
                  <option value="All State">All Package</option>
                  <option v-for="(state, index) in states" :key="index" :value="state">{{ state }}</option>
                </select>
                <img class="dropdown-icon" src="@/assets/down.png" alt="logo" />
              </div>
            </div>
          </div>
          <div class="table-container">
            <!-- Updated Table Controls with Pagination at the Top -->
            <div class="controltable">
              <div class="table-controls">
                <button class="control-btn" @click="openInViewer">
                  <img src="@/assets/pathogen/slides/view.png" alt="Open in viewer" class="button-icon" />
                  Open in viewer
                </button>
                <button class="control-btn">
                  <img src="@/assets/pathogen/slides/tag.png" alt="Apply tags" class="button-icon" />
                  Apply tags
                </button>
                <button class="control-btn">
                  <img src="@/assets/pathogen/slides/export.png" alt="Export" class="button-icon" />
                  Export
                </button>
              </div>
              <div>
                <!-- Updated Pagination Layout -->
                <div class="pagination-container">
                  <span class="pagination-info">{{ startIndex }}-{{ endIndex }} of {{ cases.length }}</span>
                  <button class="pagination-arrow" :disabled="currentPage === 1" @click="prevPage">❮</button>
                  <button class="pagination-arrow" :disabled="currentPage === totalPages" @click="nextPage">❯</button>
                </div>
              </div>
            </div>

            <table class="case-table">
              <thead>
                <tr>
                  <th />
                  <th>Case</th>
                  <th>Pathologist</th>
                  <th>Patient</th>
                  <th>Birthdate & Gender</th>
                  <th>Last update</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Total Slides</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr v-for="(caseItem, index) in paginatedCases" :key="index">
                  <td>
                    <input
                      type="checkbox"
                      :checked="selectedCases.includes(caseItem.id)"
                      @change="toggleSelection(caseItem.id)"
                    />
                  </td>
                  <td>
                    <strong>{{ caseItem.id }}</strong>
                    <br />
                    <span class="case-id">P-9890200</span>
                  </td>
                  <td>
                    <div class="pathologist">
                      <span class="initials">{{ caseItem.pathologist.initials }}</span>
                      <span>{{ caseItem.pathologist.name }}</span>
                    </div>
                  </td>
                  <td>{{ caseItem.patient }}</td>
                  <td>
                    {{ caseItem.birthdate }} <br />
                    <span class="gender">{{ caseItem.gender }}</span>
                  </td>
                  <td>{{ caseItem.lastUpdate }}</td>
                  <td>
                    <span :class="['status-badge', caseItem.status === 'COMPLETED' ? 'completed' : 'for-review']">
                      {{ caseItem.status }}
                    </span>
                  </td>
                  <td>{{ caseItem.type }}</td>
                  <td class="slide-count">
                    <div class="slide-preview">
                      <div v-for="(image, i) in caseItem.images" :key="i">
                        <img :src="image" alt="slide preview" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="slide-number">{{ caseItem.slides }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    >
  </div>
</template>

<style scoped lang="scss">
.app-container {
  display: flex;
  flex-direction: column;
}
.app-menu {
  flex: 0 0 250px; /* Adjust the sidebar width */
}
.dashboard-content {
  flex: 1;
}
.dividebot {
  display: flex;
  padding: 20px;
}
.header-container {
  width: 100vw;
  height: 50px;
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
  margin-right: 25px;
}

.divider {
  left: 96%; /* Adjust based on your layout */
  top: 50%;
  width: 1px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white */
  z-index: 999; /* Ensures it appears properly */
}

.dashboard-container {
  background: #f9fbff;
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures it grows */
  overflow-y: auto;
}

// Header & Filters,

.filters-container {
  display: flex;
  align-items: center;
  padding: 20px 22px;
  border-radius: 8px;
}

.filters-container {
  background: white;
  border-bottom: 1px solid #ccc;
  gap: 10px;
}

// Dropdown Styling
.custom-dropdown-container {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: -20px 0;
  padding: 20px 0;
  width: 180px;
  border-right: 1px solid #ccc;

  &:last-child {
    border-right: none;
  }

  .dropdown-label {
    font-size: 14px;
    color: #9e9e9e;
  }

  .dropdown-wrapper {
    display: flex;
    align-items: center;
  }

  .custom-dropdown {
    font-size: 16px;
    font-weight: bold;
    color: #000;
    width: 100%;
    border: none;
    background: transparent;
    appearance: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  .dropdown-icon {
    position: absolute;
    right: 10px;
    font-size: 14px;
    pointer-events: none;
    color: #000;
  }
}

// Table Container & Layout
.table-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.case-table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    font-size: 14px;
    color: gray;
  }
}

// Table Controls (Buttons & Pagination)
.controltable {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .table-controls {
    display: flex;
    align-items: center;
    gap: 10px;

    .control-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #0043e6;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.3s ease-in-out;

      &:hover {
        background: #003bb5;
      }

      .button-icon {
        width: 20px; /* Adjust icon size */
        height: 20px;
      }
    }
  }
}

// Pagination Container
.pagination-container {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: bold;
  color: black;

  .pagination-info {
    font-weight: bold;
  }

  .pagination-arrow {
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 5px;
    color: black;
    transition: opacity 0.2s ease-in-out;

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }
}

// Doctor List Styling
.doctor-info {
  display: flex;
  align-items: center;
  gap: 10px;

  .avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .doctor-name {
    font-weight: bold;
  }
}

// Action Icons (Edit/Delete)
.action-icons {
  display: flex;
  align-items: center;
  gap: 10px;

  .action-icon {
    font-size: 18px;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  .edit-icon,
  .delete-icon {
    color: black;
  }
}

// Status Badges
.status-badge {
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;

  &.for-review {
    background: #e8f1ff;
    color: #1d45a3;
  }

  &.completed {
    background: #46baef;
    color: white;
  }
}

// Pathologist Section
.pathologist {
  display: flex;
  align-items: center;
  gap: 8px;

  .initials {
    background: #4a90e2;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
}

.case-id {
  color: gray;
  font-size: 13px;
}

.slide-preview {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.slide-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f1f1f1;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  border-radius: 6px;
  padding: 4px 10px;
  min-width: 28px;
  text-align: center;
}

input[type='checkbox'] {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #009fcf;
  border-radius: 1px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease-in-out;
}

input[type='checkbox']:checked {
  background-color: #007aff;
  border-color: #007aff;
}

input[type='checkbox']:checked::before {
  content: '✔';
  font-size: 12px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
}

.app-header {
  width: 100%;
  background: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

/* New Cases Section */
.cases-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 20px 30px;
  border-bottom: 1px solid #ddd;
}

.cases-title h2 {
  font-size: 22px;
  font-weight: bold;
  color: #222;
}

.case-count {
  font-weight: normal;
  color: #555;
}

/* Button Styling */
.new-test-btn {
  display: flex;
  align-items: center;
  background: #2c4fc3;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.new-test-btn el-icon {
  margin-right: 6px;
}

.cases-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
}

.cases-title h2 {
  font-size: 22px;
  font-weight: bold;
  color: #222;
}

.case-count {
  font-weight: normal;
  color: #555;
}

/* Button Styling */
.new-test-btn {
  display: flex;
  align-items: center;
  background: #2c4fc3;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
</style>
