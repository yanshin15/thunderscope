<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Edit } from '@element-plus/icons-vue'
import clipboardIcon from '@/assets/file2.png'
import smileIcon from '@/assets/smile.png'
import wheelchairIcon from '@/assets/wheelchair.png'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { createMedicalPackage } from '@/utils/api'

const route = useRoute()
const router = useRouter()

const newPackage = {
  name: 'IamTesting',
  imageBase64: 'data:image/png;base64,iVBORw0KGgoAAAANbUhEUgAAABUA...',
  tests: [
    {
      name: 'WEIGHT',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANbUhEUgAAABUA...'
    },
    {
      name: 'TEMPERATURE',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANbUhEUgAAABUA...'
    }
  ]
}

onMounted(() => {
  const routedId = route.query.lastId as string | undefined

  if (routedId && !isNaN(Number(routedId))) {
    packageID.value = (Number(routedId) + 1).toString()
  }

  console.log('New lastId:', packageID.value)
})

// Reactive state for form inputs
const packageName = ref('Elderly Package')
const packageID = ref('')
const tests = ref<string[]>([])

// Function to add a new test
const addTest = () => {
  tests.value.push('')
}

// File upload handling (for package icon)
const packageIcon = ref<File | null>(null)
const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    packageIcon.value = input.files[0]
  }
}

// Form submission function
const createPackage = async () => {
  await submitPackage(newPackage)
  router.push({
    path: '/package',
    query: {
      id: packageID.value,
      name: packageName.value,
      tests: JSON.stringify(tests.value), // Convert array to string for query param
      totalCustomers: 0,
      testCount: tests.value.length, // Set testCount to the number of selected tests
      lastUpdate: dayjs().format('DD MMMM, YYYY') // Set last update to today's date
    }
  })
}
const submitPackage = async newPackage => {
  try {
    await createMedicalPackage(newPackage)
    console.log('✅ Package added successfully')
    router.push('/package')
  } catch (error) {
    console.error('❌ Error adding doctor:', error)
  }
}

const availableTests = ref([
  'Weight',
  'Height',
  'Temperature',
  'Oximeter',
  'Blood Pressure',
  'Body Fat Analysis',
  'Spirometry',
  'Stethoscope'
])

// Track selected tests in the modal
const selectedTests = ref<string[]>([])

// Control visibility of the test selection dropdown
const showTestDropdown = ref(false)

// Function to open the test selection dropdown
const toggleTestDropdown = () => {
  selectedTests.value = [...tests.value] // Copy existing tests
  showTestDropdown.value = !showTestDropdown.value
}

// Function to confirm test selection
const confirmTestSelection = () => {
  tests.value = [...selectedTests.value] // Update main test list
  showTestDropdown.value = false
}

// Function to remove a test from the displayed list
const removeTest = (test: string) => {
  tests.value = tests.value.filter(t => t !== test)
}

const showIconModal = ref(false)

const availableIcons = ref([
  { name: 'Clipboard', src: clipboardIcon },
  { name: 'Smiley', src: smileIcon },
  { name: 'Wheelchair', src: wheelchairIcon }
])

const selectedIcon = ref<string | null>(null) // Stores the final selected icon
const tempSelectedIcon = ref<string | null>(null) // Stores temporary selection before saving

const openIconSelection = () => {
  tempSelectedIcon.value = selectedIcon.value // Copy current selection to temp
  showIconModal.value = true
}

const selectIcon = (iconSrc: string) => {
  tempSelectedIcon.value = iconSrc // Temporarily store selection
}

const saveIconSelection = () => {
  selectedIcon.value = tempSelectedIcon.value // Apply the chosen icon
  showIconModal.value = false // Close modal
}
</script>

<template>
  <div class="create-package-container">
    <div class="header">
      <el-icon class="back-icon"><el-icon-arrow-left /></el-icon>
      <h1>Create Package</h1>
    </div>

    <el-card class="form-card">
      <!-- Package Icon Upload -->
      <div class="icon-upload-container">
        <div class="icon-section" @click="openIconSelection">
          <div class="icon-upload">
            <img v-if="selectedIcon" :src="selectedIcon" alt="Selected Icon" class="selected-icon" />
            <el-icon v-else size="40"><Edit /></el-icon>
          </div>
        </div>
        <div class="package-details">
          <el-form label-position="top">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Package Name">
                  <el-input v-model="packageName" placeholder="Enter package name" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Package ID">
                  <el-input v-model="packageID" disabled />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <!-- Add this modal for selecting or uploading an icon -->
      <el-dialog v-model="showIconModal" title="Select Icon Picture" width="500px">
        <div class="icon-selection">
          <div class="icon-option upload-option">
            <label for="icon-upload" class="upload-label">
              <el-icon size="40"><Plus /></el-icon>
              <span>Upload File</span>
            </label>
            <input id="icon-upload" type="file" accept="image/*" hidden @change="onFileChange" />
          </div>
          <div
            v-for="icon in availableIcons"
            :key="icon.name"
            class="icon-option"
            :class="{ selected: tempSelectedIcon === icon.src }"
            @click="selectIcon(icon.src)"
          >
            <img :src="icon.src" :alt="icon.name" />
          </div>
        </div>
        <template #footer>
          <el-button class="submit-button" type="primary" @click="saveIconSelection">Save</el-button>
        </template>
      </el-dialog>

      <div class="divider" />

      <!-- Tests Section -->
      <h3>Tests inside the package</h3>
      <el-card class="tests-container">
        <!-- Display selected tests as removable tags -->
        <div class="selected-tests">
          <el-tag v-for="test in tests" :key="test" closable @close="removeTest(test)">
            {{ test }}
          </el-tag>
        </div>

        <!-- Add Test Button -->
        <button class="addtestbtn" @click="toggleTestDropdown">
          <span>Add Test</span>
          <el-icon><Plus /></el-icon>
        </button>

        <!-- Test Selection Box -->
        <div v-if="showTestDropdown" class="test-selection-box">
          <h4>Select Test</h4>
          <el-checkbox-group v-model="selectedTests">
            <el-checkbox v-for="test in availableTests" :key="test" :label="test">
              {{ test }}
            </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" class="add-btn" @click="confirmTestSelection">Add</el-button>
        </div>
      </el-card>

      <!-- Submit Button -->
      <div class="submit-container">
        <el-button type="primary" class="submit-button" @click="createPackage">Create</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.create-package-container {
  padding: 20px;
  background: #f9fbff;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.back-icon {
  font-size: 24px;
  margin-right: 10px;
  cursor: pointer;
}

.form-card {
  min-height: 500px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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

.tests-container {
  background: #f2f8fd;
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
}

.submit-button {
  width: 240px; /* Fixed width */
  margin-top: 25px; /* Centers horizontally */
  font-size: 16px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-self: left;
  align-items: center;
  background-color: #0c45ca;
  min-height: 45px;
}
.package-details {
  flex: 1; /* Takes the remaining 75% */
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.package-details ::v-deep(.el-form-item__label) {
  font-weight: bold;
  font-size: 14px;
  color: #333;
}

/* Add border radius to input fields */
.package-details :deep(.el-input) {
  width: 100%; /* Ensures full width */
  border-radius: 8px;
  border: 1px solid #ccc;
}

.addtestbtn {
  color: #0034ee;
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: white;
  border: 2px solid #0034ee;
  padding: 5px 10px;
  border-radius: 15px;
}

.selected-tests {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.el-tag {
  background-color: white;
  border: 1px solid #ddd;
  padding: 20px 15px;
  border-radius: 5px;
  color: black;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}

.submit-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.addtestbtn {
  color: black;
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: white;
  border: 2px solid #0034ee;
  padding: 5px 10px;
  border-radius: 15px;
  cursor: pointer;
}

.el-icon svg {
  color: black;
}

/* Test Selection Box */
.test-selection-box {
  position: absolute;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 15px;
  width: 250px;
  z-index: 1000;
  margin-top: 5px;
}

.test-selection-box h4 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Arrange checkboxes vertically */
.test-selection-box .el-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 200px;
  overflow-y: auto;
}

/* Checkbox styles */
.el-checkbox {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #333;
}

/* Add Button */
.add-btn {
  width: 100%;
  margin-top: 10px;
  background-color: #0c45ca;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 8px;
  text-align: center;
}

.icon-selection {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.icon-option {
  width: 120px;
  height: 120px;
  border: 2px solid transparent;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.icon-option img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.icon-option:hover {
  border: 2px solid #0c45ca;
}

.upload-option {
  background: #f2f8fd;
  border: 2px dashed #0c45ca;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.upload-option:hover {
  background: #e0e7ff;
}

.selected {
  border: 2px solid #0c45ca !important;
}
</style>
