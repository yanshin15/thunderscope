<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Edit } from '@element-plus/icons-vue'
import clipboardIcon from '@/assets/file2.png'
import smileIcon from '@/assets/smile.png'
import wheelchairIcon from '@/assets/wheelchair.png'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { addpatient } from '@/utils/api'

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

const submitPatient = async () => {
  try {
    if (!doctorImage.value) {
      console.error('🚨 No image selected!')
      return
    }
    console.log('This is phone', phone.value)
    const formData = new FormData()
    formData.append('name', packageName.value)
    formData.append('gender', gender.value)
    formData.append('age', age.value)
    formData.append('dob', birthDate.value ? birthDate.value.toISOString().split('T')[0] : '')
    formData.append('phoneNumber', phone.value)
    formData.append('address', address.value)
    formData.append('image', doctorImage.value) // ✅ Append actual file

    console.log('📌 Sending FormData:')
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value)
    }

    await addpatient(formData)
    console.log('✅ Patients added successfully')
    router.push('/patient')
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

// const doctorImage = ref<File | null>(null)

// const handleImageUpload = (event: Event) => {
//   const file = (event.target as HTMLInputElement).files?.[0]
//   if (!file) {
//     console.error('🚨 No file selected!')
//     return
//   }

//   doctorImage.value = file // ✅ Store file object
//   console.log('📌 Selected Image:', doctorImage.value)
// }
</script>

<template>
  <div class="create-package-container">
    <div class="header">
      <el-icon class="back-icon"><el-icon-arrow-left /></el-icon>
      <h1>Create Patient</h1>
    </div>

    <el-card class="form-card">
      <!-- Package Icon Upload -->
      <div class="icon-upload-container">
        <!-- <div class="icon-section">
          <div class="icon-upload">
            <img src="@/assets/doc.png" alt="Selected Icon" class="selected-icon" />
          </div>
        </div> -->
        <!-- <div class="icon-section" @click="openIconSelection">
          <div class="icon-upload">
            <img v-if="selectedIcon" :src="selectedIcon" alt="Selected Icon" class="selected-icon" />
            <el-icon v-else size="40"><Edit /></el-icon>
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
                  <el-date-picker v-model="birthDate" type="date" format="DD-MM-YYYY" placeholder="Select birth date" />
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
        <el-button type="primary" class="submit-button" @click="submitPatient">Create</el-button>
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
  justify-content: center;
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
