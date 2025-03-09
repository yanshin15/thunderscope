<template>
  <div class="allcontainer">
    <!-- Header -->
    <div class="header-container">
      <!-- Left Section: Case ID & Status -->
      <div class="left-section">
        <img src="@/assets/pathogen/back.png" alt="logo" class="app-logo" />
        <div class="divider" />
        <span class="case-id">Create New Test</span>
      </div>

      <!-- Right Section: Logo & Settings -->
      <div class="right-section">
        <div v-if="showconnect" class="device-status">
          <span class="dot">•</span>
          <span class="case-id">Device Connected</span>
        </div>

        <img src="@/assets/menu/logo.png" alt="logo" class="app-logo" />
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

    <!-- Main Content -->
    <div class="main-container">
      <!-- Sidebar -->
      <div class="sidebar">
        <ul>
          <li :class="{ active: selectedTab === 'setup' }" @click="selectedTab = 'setup'">
            <input type="radio" :checked="selectedTab === 'setup'" /> Setup Device
          </li>
          <li :class="{ active: selectedTab === 'info' }" @click="selectedTab = 'info'">
            <input type="radio" :checked="selectedTab === 'info'" /> Patient Info
          </li>
        </ul>
      </div>

      <!-- Content Section -->
      <div class="content">
        <div v-if="selectedTab === 'setup'" class="preinfo">
          <div class="title-box">
            <h2 class="title">Setup Device</h2>
          </div>
          <div class="device-setup">
            <img src="@/assets/microscope.png" alt="Microscope Image" class="microscope-image" />
            <div class="setup-instructions">
              <h3>Steps to set up</h3>
              <div class="flex">
                <div>
                  <ul>
                    <li>1. Connect the microscope</li>
                    <li>2. Press the start button on the device</li>
                  </ul>
                </div>
                <div>
                  <button class="connect-btn" @click="switchToPatientInfo">Connect</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedTab === 'info'" class="afterinfo">
          <div class="title-box">
            <h2 class="title">Create Patient Info</h2>
          </div>
          <el-card class="form-card">
            <div class="icon-upload-container">
              <div class="icon-section" @click="triggerFileInput">
                <div class="icon-upload">
                  <img :src="selectedIcon || availableIcons[0].src" alt="Selected Icon" class="selected-icon" />
                  <img src="@/assets/slides/edit.png" alt="Edit Icon" class="edit-icon" />
                </div>
              </div>
              <div class="package-details">
                <el-form label-position="top">
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden-input"
                    @change="handleImageUpload"
                  />
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="Patient Name">
                        <el-input v-model="packageName" placeholder="Enter package name" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="Gender">
                        <el-select v-model="gender" placeholder="Select Gender">
                          <el-option label="Male" value="Male" />
                          <el-option label="Female" value="Female" />
                          <el-option label="Other" value="Other" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <div class="icon-upload-container">
              <div class="package-details">
                <el-form label-position="top">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="Email">
                        <el-input v-model="email" placeholder="Enter email" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="Phone Number">
                        <el-input v-model="phone" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="Birth Date">
                        <el-date-picker
                          v-model="birthDate"
                          type="date"
                          format="DD-MM-YYYY"
                          placeholder="Select birth date"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="Age">
                        <el-input v-model="age" placeholder="Enter age" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="State">
                        <el-select v-model="state" placeholder="Select State">
                          <el-option label="Singapore" value="Singapore" />
                          <el-option label="California" value="California" />
                          <el-option label="Texas" value="Texas" />
                          <el-option label="New York" value="New York" />
                          <el-option label="Florida" value="Florida" />
                          <el-option label="Illinois" value="Illinois" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="Address">
                        <el-input v-model="address" type="textarea" placeholder="Enter address" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>

            <!-- Tests Section -->

            <!-- Submit Button -->
            <div class="submit-container">
              <el-button type="primary" class="submit-button" @click="topathogen()">Submit</el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import smileIcon from '@/assets/smile.png'
import { Edit } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const selectedSlideIds = ref([])
const showconnect = ref(false)

onMounted(() => {
  // Parse slide IDs from query params
  if (route.query.slides) {
    selectedSlideIds.value = route.query.slides.split(',') // Convert string back to array
  }
  console.log('Selected Slide IDs:', selectedSlideIds.value)
})

const topathogen = () => {
  if (selectedSlideIds.value.length === 0) {
    return // Do nothing if no slides are selected
  }

  // Convert array of IDs to a comma-separated string
  router.push({
    path: '/bigview'
  })
}

const switchToPatientInfo = () => {
  selectedTab.value = 'info' // Show 'afterinfo' when clicking connect
  showconnect.value = true
}

const route = useRoute()
const router = useRouter()

const gender = ref('Male') // Gender dropdown state
// Reactive state for form inputs
const packageName = ref('')
const packageID = ref('PG-0001')
const tests = ref<string[]>([])
const birthDate = ref(null)
const age = ref('')
const email = ref('')
const phone = ref('8734')
const address = ref('')

// Form submission function
const createPackage = () => {
  router.push('/patient')
}

const clinic = ref('')
const state = ref('')

const doctorImage = ref<File | null>(null)

const selectedTab = ref('setup') // Default tab is Setup Device

const availableIcons = ref([{ name: 'Smile', src: smileIcon }])
const selectedIcon = ref<string>(availableIcons.value[0].src)
const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()

    reader.onload = e => {
      selectedIcon.value = (e.target?.result as string) || availableIcons.value[0].src // Display image
    }

    doctorImage.value = file // ✅ Store actual file for upload
    reader.readAsDataURL(file)

    console.log('✅ Image selected:', file)
  }
}
const goPersonal = () => {
  console.log('Navigating to Profile...')
}

const logout = () => {
  console.log('Logging out...')
}
</script>

<style scoped lang="scss">
/* General container */
.allcontainer {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header-container {
  width: 100vw;
  height: 50px;
  background: linear-gradient(to right, #0e214f, #1f4cb5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 1000;
  color: white;

  .left-section {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    span {
      font-weight: lighter;
      font-size: 14px;
    }
    .case-id {
      font-weight: normal;
      font-size: 18px;
    }
  }
  .right-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    gap: 20px;

    .settings-icon {
      margin-right: 10px;
    }
    .device-status {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
    }
    .dot {
      margin-right: 5px;
      margin-bottom: 7px;
      font-size: 40px;
      align-items: center;
      color: #06ffb8;
    }
  }
  .divider {
    width: 1px;
    height: 49px;
    background: rgba(221, 221, 221, 0.4); /* Lower opacity only for the background */
  }
}

/* Main container layout */
.main-container {
  display: flex;
  flex: 1;
}

/* Sidebar styling */
.sidebar {
  width: 250px;
  background: #f8f9fc;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  font-size: 16px;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar li.active {
  background: #e0e7ff;
  font-weight: bold;
}

/* Content area */
.content {
  flex: 1;
  background-color: white;
}
/* Title Box */
.title-box {
  position: relative;
  width: calc(100% + 80px); /* Expands to full width beyond padding */
  background: white;
  padding: 20px 20px;
  box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.1); /* Bottom shadow only */
  border-radius: 8px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

/* Device setup section */
.device-setup {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.microscope-image {
  width: 400px;
  border-radius: 8px;
}

.setup-instructions {
  max-width: 400px;
}

.setup-instructions h3 {
  font-size: 18px;
  font-weight: bold;
}

.setup-instructions ul {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

.setup-instructions li {
  font-size: 16px;
  margin: 5px 0;
}

/* Connect button */
.connect-btn {
  background: #204cb5;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.connect-btn:hover {
  background: #102a7a;
}

.flex {
  display: flex;
  flex-direction: row;
  gap: 40px;
}

.back-icon {
  font-size: 24px;
  margin-right: 10px;
  cursor: pointer;
}

.el-card {
  border: none !important;
  box-shadow: none !important;
}

.form-card {
  background: white !important;
  padding: 20px !important;
  box-shadow: none !important;
}

.icon-upload-container {
  display: flex;
  margin-bottom: 20px;
  gap: 40px;
}

.icon-section {
  flex: 0 0 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-upload {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.submit-button {
  width: 240px;
  margin-top: 25px;
  font-size: 16px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0c45ca;
}

.package-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Customizing form inputs */
.package-details :deep(.el-input),
.package-details :deep(.el-select),
.package-details :deep(.el-date-editor) {
  width: 100%;
  border-radius: 12px !important;
  height: 40px !important;
  font-size: 16px !important;
  padding: 10px !important;
  padding-left: 0px !important;
}

:deep(.el-select__wrapper),
:deep(.el-input__wrapper) {
  border-radius: 12px !important;
  padding: 10px !important;
  min-height: 40px !important;
}

.submit-container {
  display: flex;
  justify-content: flex-start !important; /* Align button to the left */
  margin-top: 20px;
}

.package-details :deep(.el-form-item--label-top .el-form-item__label) {
  display: inline-block;
  height: auto;
  line-height: 22px;
  margin-bottom: 10px !important; /* Adds space below all labels */
  text-align: left;
  vertical-align: middle;
  margin-top: 10px !important;
  font-weight: bold;
  font-size: 16px;
}

/* Ensure Address input matches other inputs */
.package-details :deep(.el-textarea__inner) {
  width: 100%;
  border-radius: 12px !important;
  height: 80px !important; /* Match other inputs */
  font-size: 16px !important;
  padding: 10px !important;
  resize: none !important; /* Prevent resizing */
}

/* Ensure Address wrapper matches other input containers */
.package-details :deep(.el-textarea) {
  width: 100%;
  border-radius: 12px !important;
  padding: 10px !important;
  min-height: 40px !important;
  padding-left: 0px !important;
}

.icon-upload-container {
  display: flex;
  margin-bottom: 20px;
  gap: 40px;
}

.icon-section {
  flex: 0 0 10%; /* Takes 25% of the space */
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-upload {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border: 1px solid gray;
  opacity: 0.7;
}

.hidden-input {
  position: absolute;
  width: 0px;
  height: 0px;
  padding: 0;
  margin: 0;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}

.selected-icon {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures cropping */
  object-position: center; /* Centers the image */
}

.edit-icon {
  position: absolute;
  bottom: 5px;
  right: 1px;
  background-color: white; /* Optional: Adds contrast */
  border-radius: 50%;
  padding: 4px;
  font-size: 16px;
  color: #204cb5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 30px;
  height: 30px;
}
</style>
