<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Plus, Edit } from '@element-plus/icons-vue'
import clipboardIcon from '@/assets/file2.png'
import smileIcon from '@/assets/smile.png'
import wheelchairIcon from '@/assets/wheelchair.png'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { getDoctorById } from '@/utils/api'
import { updatedoc } from '@/utils/api'

const route = useRoute()
const router = useRouter()
const doctorId = ref<number | null>(null)

const doctor = ref({
  id: null,
  name: '',
  specialization: '',
  status: '',
  review: 0,
  email: '',
  password: '',
  state: '',
  clinic: '',
  gender: '',
  age: '',
  dob: null, // Ensure dob is set to null initially for date input
  image: ''
})

onMounted(async () => {
  try {
    doctorId.value = Number(route.query.id) // Extract ID from query params
    if (!doctorId.value) {
      console.error('Doctor ID is missing in the URL')
      return
    }

    console.log(`Fetching doctor details for ID: ${doctorId.value}`)
    await fetchDoctorDetails(doctorId.value) // Fetch doctor data dynamically
  } catch (error) {
    console.error('Failed to fetch doctor:', error)
  }
})

const fetchDoctorDetails = async (id: number) => {
  try {
    const response = await getDoctorById(id) // API call
    const data = response.data

    doctor.value = {
      id: data.id || null,
      name: data.name || '',
      specialization: data.specialization || '',
      status: data.status || '',
      review: data.review || 0,
      email: data.email || '',
      password: data.password || '',
      state: data.state || '',
      clinic: data.clinic || '',
      gender: data.gender || '',
      age: data.age || '',
      dob: data.dob ? new Date(data.dob) : null, // Convert DOB to Date object
      image: data.imageBase64 || ''
    }

    console.log('Doctor details stored:', doctor.value)
  } catch (error) {
    console.error('Error fetching doctor:', error)
  }
}

const updateDoctor = async () => {
  try {
    if (!doctorId.value) {
      ElMessage.error('Doctor ID is missing!')
      return
    }

    const updatedDoctorData = {
      name: doctor.value.name,
      specialization: doctor.value.specialization,
      status: doctor.value.status,
      review: doctor.value.review,
      email: doctor.value.email,
      password: doctor.value.password,
      state: doctor.value.state,
      clinic: doctor.value.clinic,
      gender: doctor.value.gender,
      age: doctor.value.age,
      dateOfBirth: doctor.value.dob,
      imageBase64: doctor.value.image
    }

    const response = await updatedoc(doctorId.value, updatedDoctorData)
    console.log('Doctor updated successfully:', response.data)
    ElMessage.success('Doctor updated successfully!')

    // Redirect to doctor list page after update
    router.push('/doctor')
  } catch (error) {
    console.error('Error updating doctor:', error)
    ElMessage.error('Failed to update doctor')
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
        doctor.value.image = base64String // ✅ Store as Base64 string
        console.log('✅ Converted Image to Base64:', doctor.value.image)
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
      <h1>Edit Doctor</h1>
    </div>

    <el-card class="form-card">
      <!-- Package Icon Upload -->
      <div class="icon-upload-container">
        <div class="icon-section">
          <!-- <div class="icon-upload">
            <img :src="'data:image/jpeg;base64,' + doctor.image" alt="Profile Picture" class="selected-icon" />
            <el-icon class="edit-icon"><Edit /></el-icon>
          </div> -->
          <div class="icon-upload" @click="triggerFileInput">
            <img
              :src="doctor.image ? 'data:image/jpeg;base64,' + doctor.image : availableIcons[0].src"
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
                <el-form-item label="Doctor Name">
                  <el-input v-model="doctor.name" placeholder="Enter package name" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Gender">
                  <el-select v-model="doctor.gender" placeholder="Select Gender">
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
                  <el-input v-model="doctor.clinic" placeholder="Enter clinic name" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="State">
                  <el-select v-model="doctor.state" placeholder="Select State">
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
                  <el-date-picker
                    v-model="doctor.dob"
                    type="date"
                    format="DD-MM-YYYY"
                    placeholder="Select birth date"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="Age">
                  <el-input v-model="doctor.age" placeholder="Enter age" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Specialist">
                  <el-select v-model="doctor.specialization" placeholder="Select Specialist">
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
        <el-button type="primary" class="submit-button" @click="updateDoctor">Save</el-button>
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

.icon-upload {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative; /* Needed for positioning the icon */
}

.selected-icon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
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
