<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Edit } from '@element-plus/icons-vue'
import clipboardIcon from '@/assets/file2.png'
import smileIcon from '@/assets/smile.png'
import wheelchairIcon from '@/assets/wheelchair.png'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { adddoc } from '@/utils/api'

const route = useRoute()
const router = useRouter()

const gender = ref('Male') // Gender dropdown state
// Reactive state for form inputs
const packageName = ref('')
const packageID = ref('PG-0001')
const tests = ref<string[]>([])
const birthDate = ref(null)
const age = ref('')
const specialist = ref('')

const doctorImage = ref<File | null>(null)

// Form submission function
const createPackage = () => {
  router.push('/doctor')
}

const clinic = ref('')
const state = ref('')

const submitDoctor = async () => {
  try {
    if (!doctorImage.value) {
      console.error('🚨 No image selected!')
      return
    }

    const formData = new FormData()
    formData.append('name', packageName.value)
    formData.append('review', '4.5') // Default review
    formData.append('specialization', specialist.value)
    formData.append('state', state.value)
    formData.append('clinic', clinic.value)
    formData.append('gender', gender.value)
    formData.append('age', age.value)
    formData.append('dob', birthDate.value ? birthDate.value.toISOString().split('T')[0] : '')
    formData.append('email', 'test@example.com') // Replace with actual email
    formData.append('password', 'password123') // Replace with actual password
    formData.append('image', doctorImage.value) // ✅ Append actual file

    console.log('📌 Sending FormData:')
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value)
    }

    await adddoc(formData)
    console.log('✅ Doctor added successfully')
    router.push('/doctor')
  } catch (error) {
    console.error('❌ Error adding doctor:', error)
  }
}

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
</script>

<template>
  <div class="create-package-container">
    <div class="header">
      <el-icon class="back-icon"><el-icon-arrow-left /></el-icon>
      <h1>Create Doctor</h1>
    </div>

    <el-card class="form-card">
      <!-- Package Icon Upload -->
      <div class="icon-upload-container">
        <!-- <div class="icon-section">
          <div class="icon-upload">
            <img src="@/assets/doc.png" alt="Selected Icon" class="selected-icon" />
            <el-icon class="edit-icon"><Edit /></el-icon>
          </div>
        </div> -->
        <div class="icon-section" @click="triggerFileInput">
          <div class="icon-upload">
            <img :src="selectedIcon || availableIcons[0].src" alt="Selected Icon" class="selected-icon" />
            <el-icon class="edit-icon"><Edit /></el-icon>
          </div>
        </div>

        <div class="package-details">
          <el-form label-position="top">
            <input ref="fileInput" type="file" accept="image/*" class="hidden-input" @change="handleImageUpload" />
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Doctor Name">
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
                <el-form-item label="Clinic">
                  <el-input v-model="clinic" placeholder="Enter clinic name" />
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

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Birth Date">
                  <el-date-picker v-model="birthDate" type="date" format="DD-MM-YYYY" placeholder="Select birth date" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="Age">
                  <el-input v-model="age" placeholder="Enter age" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Specialist">
                  <el-select v-model="specialist" placeholder="Select Specialist">
                    <el-option label="Cardiologist" value="Cardiologist" />
                    <el-option label="Dermatologist" value="Dermatologist" />
                    <el-option label="Neurologist" value="Neurologist" />
                    <el-option label="Pediatrician" value="Pediatrician" />
                    <el-option label="Orthopedic" value="Orthopedic" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <!-- Tests Section -->

      <!-- Submit Button -->
      <div class="submit-container">
        <el-button type="primary" class="submit-button" @click="submitDoctor">Create</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.create-package-container {
  padding: 20px;
  min-height: 100vh;
  width: 80%;
  margin: 0 auto; /* Centers it horizontally */
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
  justify-content: center;
  margin-top: 20px;
}

.package-details :deep(.el-form-item--label-top .el-form-item__label) {
  display: inline-block;
  height: auto;
  line-height: 22px;
  margin-bottom: 0px !important; /* Ensure it overrides other styles */
  text-align: left;
  vertical-align: middle;
  margin-top: 10px !important; /* Ensure it takes effect */
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
  right: 5px;
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
