<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Plus, Edit } from '@element-plus/icons-vue'
import clipboardIcon from '@/assets/file2.png'
import smileIcon from '@/assets/smile.png'
import wheelchairIcon from '@/assets/wheelchair.png'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { getDoctorById } from '@/utils/api'
import { updateUser } from '@/utils/api'

const route = useRoute()
const router = useRouter()
const patientId = ref<number | null>(null)

const patient = ref({
  id: null,
  name: '',
  gender: '',
  address: '',
  age: '',
  dob: '11-05-2019', // Set to null initially for date input
  image: '',
  phone: '',
  email: '',
  state: ''
})

onMounted(() => {
  // Extract all patient data from route query
  if (route.query.id) {
    patientId.value = Number(route.query.id)
    patient.value = {
      name: route.query.name || '',
      gender: route.query.gender || '',
      address: route.query.address || '',
      age: route.query.age || '',
      // dob: route.query.dob || '',
      image: route.query.image || '',
      phone: route.query.phone || '',
      email: route.query.email || '',
      state: route.query.state || ''
    }

    console.log('✅ Patient Data Loaded:', patient.value)
  } else {
    console.error('🚨 Patient ID is missing in the URL!')
  }
})

// const fetchDoctorDetails = async (id: number) => {
//   try {
//     const response = await getDoctorById(id) // API call
//     const data = response.data

//     patient.value = {
//       id: data.id || null,
//       name: data.name || '',
//       specialization: data.specialization || '',
//       status: data.status || '',
//       review: data.review || 0,
//       email: data.email || '',
//       password: data.password || '',
//       state: data.state || '',
//       clinic: data.clinic || '',
//       gender: data.gender || '',
//       age: data.age || '',
//       dob: data.dob ? new Date(data.dob) : null, // Convert DOB to Date object
//       image: data.imageBase64 || ''
//     }

//     console.log('Doctor details stored:', patient.value)
//   } catch (error) {
//     console.error('Error fetching doctor:', error)
//   }
// }

const updatePatient = async () => {
  try {
    if (!patientId.value) {
      ElMessage.error('Doctor ID is missing!')
      return
    }

    const updatedPatientData = {
      name: patient.value.name,
      address: patient.value.address,
      phoneNumber: patient.value.phone,
      gender: patient.value.gender,
      age: patient.value.age,
      dob: patient.value.dob,
      imageBase64: patient.value.image
    }

    const response = await updateUser(patientId.value, updatedPatientData)
    console.log('This is patient data', updatedPatientData)
    console.log('Patient updated successfully:', response.data)
    ElMessage.success('Patient updated successfully!')

    // Redirect to doctor list page after update
    router.push('/patient')
  } catch (error) {
    console.error('Error updating patient:', error)
    ElMessage.error('Failed to update patient')
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
      if (e.target?.result) {
        const base64String = (e.target.result as string).split(',')[1] // Extract Base64 part
        patient.value.image = base64String // ✅ Store as Base64 string
        console.log('✅ Converted Image to Base64:', patient.value.image)
      }
    }

    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <div class="create-package-container">
    <div class="header">
      <el-icon class="back-icon"><el-icon-arrow-left /></el-icon>
      <h1>Edit Patient</h1>
    </div>

    <el-card class="form-card">
      <!-- Package Icon Upload -->
      <div class="icon-upload-container">
        <div class="icon-section">
          <div class="icon-upload" @click="triggerFileInput">
            <img
              :src="patient.image ? 'data:image/jpeg;base64,' + patient.image : availableIcons[0].src"
              alt="Selected Icon"
              class="selected-icon"
            />
            <el-icon class="edit-icon"><Edit /></el-icon>
          </div>
        </div>
        <div class="package-details">
          <el-form label-position="top">
            <input ref="fileInput" type="file" accept="image/*" class="hidden-input" @change="handleImageUpload" />
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Patient Name">
                  <el-input v-model="patient.name" placeholder="Enter package name" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Gender">
                  <el-select v-model="patient.gender" placeholder="Select Gender">
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
                  <el-input v-model="patient.email" placeholder="Enter email" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Phone Number">
                  <el-input v-model="patient.phone" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Birth Date">
                  <el-date-picker
                    v-model="patient.dob"
                    type="date"
                    format="DD-MM-YYYY"
                    placeholder="Select birth date"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="Age">
                  <el-input v-model="patient.age" placeholder="Enter age" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="State">
                  <el-select v-model="patient.state" placeholder="Select State">
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
                  <el-input v-model="patient.address" type="textarea" placeholder="Enter address" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <!-- Tests Section -->

      <!-- Submit Button -->
      <div class="submit-container">
        <el-button type="primary" class="submit-button" @click="updatePatient">Save</el-button>
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
</style>
