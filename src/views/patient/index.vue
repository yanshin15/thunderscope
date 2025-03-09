<script setup lang="ts" name="Package">
import { ref, computed, onMounted } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { getpatients } from '@/utils/api'
import { deletepatient } from '@/utils/api'

const route = useRoute()
const router = useRouter()

import dayjs from 'dayjs'

const formattedDateRange = computed(() => {
  return dateRange.value.map(date => dayjs(date).format('DD/MM/YYYY'))
})

const addPatient = () => {
  router.push('/addpatient')
}

const editPatient = patient => {
  if (!patient || !patient.id) {
    console.error('🚨 Invalid patient data:', patient)
    return
  }

  // Redirect to edit page, passing the entire object as query parameters
  router.push({
    path: '/editpatient',
    query: {
      id: patient.id,
      name: patient.name,
      gender: patient.gender,
      age: patient.age,
      dob: patient.dob,
      phone: patient.phone,
      image: patient.image,
      address: patient.address
    }
  })
}
const deletePatientList = async (id: number) => {
  if (!id) {
    console.error('Invalid doctor ID')
    return
  }

  if (confirm(`Are you sure you want to delete the doctor with ID: ${id}?`)) {
    try {
      await deletepatient(id)
      patients.value = patients.value.filter(patient => patient.id !== id)
      console.log(`Deleted doctor with ID: ${id}`)
    } catch (error) {
      console.error('Error deleting doctor:', error)
    }
  }
}

const dateRange = ref([dayjs().format('YYYY-MM-DD'), dayjs().add(7, 'day').format('YYYY-MM-DD')])

import smileIcon from '@/assets/smile.png'

const currentPagePackages = ref(1) // First table pagination
const currentPagePackages2 = ref(1) // Second table pagination
const pageSize = ref(10)

// Compute paginated data
const paginatedData = computed(() => {
  const start = (currentPagePackages.value - 1) * pageSize.value
  const end = start + pageSize.value
  return packages.value.slice(start, end)
})

const paginatedPackages2 = computed(() => {
  const start = (currentPagePackages2.value - 1) * pageSize.value
  const end = start + pageSize.value
  return patients.value.slice(start, end)
})

// Handle page change
const handlePageChangePackages = page => {
  currentPagePackages.value = page
}

// Handle page change for the second table
const handlePageChangePackages2 = page => {
  currentPagePackages2.value = page
}

const selectedDateRange = ref(null)
const selectedFilter = ref(null)

const packagestattotal = ref({
  title: 'Total Doctor',
  value: '40',
  percentage: '8.5%',
  description: ' Up from last month'
})
const packageStats = ref([
  { title: 'Total Doctors', value: '18,928', percentage: '8.5%', description: 'Up from last month' },
  { title: 'Male', value: '18,000', percentage: '8.5%' },
  { title: 'Female', value: '928', percentage: '8.5%' },
  { title: '< 30 years old', value: '4,928', percentage: '8.5%' },
  { title: '> 30 years old', value: '14,000', percentage: '8.5%' }
])

const filteredPackages2 = computed(() => {
  return packages2.value.filter(pkg => {
    return (
      (selectedState.value === 'All State' || pkg.state === selectedState.value) &&
      (selectedClinic.value === 'All Clinic' || pkg.clinic === selectedClinic.value) &&
      (selectedGender.value === 'All Gender' || pkg.gender === selectedGender.value) &&
      (selectedAge.value === 'All Age' || pkg.age === selectedAge.value) &&
      (selectedPackage.value === 'All Package' || pkg.package === selectedPackage.value)
    )
  })
})

const selectedState = ref('All State')
const selectedClinic = ref('All Clinic')
const selectedGender = ref('All Gender')
const selectedAge = ref('All Age')
const selectedPackage = ref('All Package')

const states = ref(['California', 'Texas', 'New York', 'Florida', 'Illinois'])
const clinics = ref(['Clinic A', 'Clinic B', 'Clinic C'])
const packages = ref(['Standard Package', 'Premium Package'])

const itemsPerPage = 4
const currentPage = ref(0)

// Compute total number of pages
const totalPages = computed(() => Math.ceil(packageStats.value.length / itemsPerPage))

// Move to next page
const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
  }
}

// Move to previous page
const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

const patients = ref([])

onMounted(async () => {
  try {
    console.log('Fetching Patients...')
    await getpatientlist() // ✅ Ensure data is fetched
    console.log('Patients fetched:', patients.value)
  } catch (error) {
    console.error('Failed to fetch patients:', error)
  }
})

const getpatientlist = async () => {
  try {
    const response = await getpatients()
    const data = response.data
    console.log('This si data ', data)
    patients.value = data.map(doc => {
      return {
        id: decodeURIComponent(doc.id || 'Unknown'),
        name: decodeURIComponent(doc.name || 'Unknown'),
        gender: decodeURIComponent(doc.gender || 'No gender'),
        age: decodeURIComponent(doc.age || 'No age'),
        image: decodeURIComponent(doc.imageBase64 || 'No age'),
        state: decodeURIComponent(doc.state || 'No age'),
        phone: decodeURIComponent(doc.phoneNumber || 'No age'),
        address: decodeURIComponent(doc.address || 'No age'),
        dob: decodeURIComponent(doc.dateOfBirth || 'No age')
      }
    })
    console.log('This is the response data', data)
    console.log('This is the appointment list', patients.value)
  } catch (error) {
    console.error('This did not work', error)
  }
}
</script>

<template>
  <div class="dashboard-container">
    <!-- Page Header -->
    <div class="header-container">
      <h1 class="heading">Patient</h1>
      <el-button class="addbutton" type="primary" size="large" @click="addPatient()">
        <img src="@/assets/plus.png" alt="Plus Icon" class="plus-icon" />
        New Patient
      </el-button>
    </div>

    <div class="dashboard-container">
      <!-- Package Summary Container -->
      <div class="package-summary-container">
        <div
          v-for="(stat, index) in packageStats"
          :key="index"
          class="stat-card"
          :class="{ 'wide-stat-card': index === 0, 'third-stat-card': index === 2 }"
        >
          <div class="stat-content">
            <h2 class="stat-title">{{ stat.title }}</h2>
            <p class="stat-value">{{ stat.value }}</p>
            <div class="stat-footer">
              <img src="@/assets/up-icon.png" alt="trend icon" class="trend-icon" />
              <p v-if="stat.percentage" class="stat-percentage">{{ stat.percentage }}</p>
              <p v-if="stat.description" class="stat-description">{{ stat.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="seperatetitle">Patient List</div>
    <div class="filters-container">
      <!-- State Dropdown -->
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

      <!-- Clinic Dropdown -->
      <div class="custom-dropdown-container">
        <label class="dropdown-label">Clinic</label>
        <div class="dropdown-wrapper">
          <select v-model="selectedClinic" class="custom-dropdown">
            <option value="All Clinic">All Clinic</option>
            <option v-for="(clinic, index) in clinics" :key="index" :value="clinic">{{ clinic }}</option>
          </select>
          <img class="dropdown-icon" src="@/assets/down.png" alt="logo" />
        </div>
      </div>

      <!-- Gender Dropdown -->
      <div class="custom-dropdown-container">
        <label class="dropdown-label">Gender</label>
        <div class="dropdown-wrapper">
          <select v-model="selectedGender" class="custom-dropdown">
            <option value="All Gender">All Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <img class="dropdown-icon" src="@/assets/down.png" alt="logo" />
        </div>
      </div>

      <!-- Age Dropdown -->
      <div class="custom-dropdown-container">
        <label class="dropdown-label">Age</label>
        <div class="dropdown-wrapper">
          <select v-model="selectedAge" class="custom-dropdown">
            <option value="All Age">All Age</option>
            <option value="Under 30">&lt; 30</option>
            <option value="30 and above">30 and above</option>
          </select>
          <img class="dropdown-icon" src="@/assets/down.png" alt="logo" />
        </div>
      </div>

      <!-- Package Dropdown -->
      <div class="custom-dropdown-container">
        <label class="dropdown-label">Package</label>
        <div class="dropdown-wrapper">
          <select v-model="selectedPackage" class="custom-dropdown">
            <option value="All Package">All Package</option>
            <option v-for="(pkg, index) in packages" :key="index" :value="pkg">{{ pkg }}</option>
          </select>
          <img class="dropdown-icon" src="@/assets/down.png" alt="logo" />
        </div>
      </div>
    </div>
    <el-card class="table-container">
      <!-- Filters for Customers' Package Table -->
      <div>
        <div class="flexrow">
          <h2 class="table-title">18,928 Doctors</h2>
          <!-- Pagination -->
          <el-pagination
            v-model:current-page="currentPagePackages2"
            :page-size="pageSize"
            :total="patients.length"
            layout="prev, pager, next"
            class="pagination"
            @current-change="handlePageChangePackages2"
          />
        </div>
        <el-table :data="paginatedPackages2" style="width: 100%" :row-style="{ height: '45px' }" class="custom-table">
          <el-table-column prop="id" label="ID" width="70" />

          <el-table-column prop="name" label="Name" width="300">
            <template #default="{ row }">
              <div class="doctor-info">
                <img :src="'data:image/jpeg;base64,' + row.image" alt="Profile Picture" class="doctor-avatar" />
                <strong class="doctor-name">{{ row.name }}</strong>
              </div>
            </template>
          </el-table-column>

          <!-- <el-table-column prop="state" label="State" width="100" /> -->
          <el-table-column prop="phone" label="Phone" width="120" />
          <el-table-column prop="gender" label="Gender" width="150" />
          <el-table-column prop="age" label="Age" width="70" />
          <el-table-column prop="address" label="Address" width="400" />

          <el-table-column label="Action" width="120">
            <template #default="{ row }">
              <div class="action-icons">
                <el-icon class="action-icon edit-icon" @click="editPatient(row)">
                  <Edit />
                </el-icon>
                <el-icon class="action-icon delete-icon" @click="deletePatientList(row?.id)">
                  <Delete />
                </el-icon>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.dashboard-container {
  padding: 20px;
  background: #f9fbff;
}

/* Header */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

/* Package Summary */
.package-summary-container {
  display: flex;
  justify-content: space-between;
  background: #f9fbff;
}

.stat-card {
  flex: 1;
  background: white;
  padding: 20px;
  text-align: left;
  color: black;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  min-height: 140px;
}

/* First item larger width */
.wide-stat-card {
  flex: 1.5; /* Increase width for the first item */
  min-height: 160px;
  margin-right: 20px; /* Add right margin */
}

/* Third item with margin-right */
.third-stat-card {
  margin-right: 20px;
}

.stat-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #000;
  margin: 10px 0;
}

.stat-footer {
  display: flex;
  align-items: center;
  gap: 5px;
}

.trend-icon {
  width: 16px;
  height: 16px;
}

.stat-percentage {
  font-size: 14px;
  color: #10b981;
  font-weight: bold;
}

.stat-description {
  font-size: 14px;
  color: #6b7280;
}

/* Button */
.addbutton {
  background-color: #204cb5;
  color: white;
}
/* Filters */
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: start;
  width: 30%;
}

.filter-item {
  flex: 1;
}

/* Table */
.table-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.table-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.flexrow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.flexrowno {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.seperatetitle {
  margin-top: 30px; /* Increase if needed */
  margin-bottom: 10px;
  width: 100%;
  font-size: 18px;
  text-align: left;
  padding-left: 10px; /* Ensures left alignment */
}

.filters-container {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 20px;
  background-color: white;
  /* border-radius: 8px; */
  /* margin-bottom: 15px; */
  border-bottom: 1px solid #ccc;
}

.filter-item {
  flex: 1;
  min-width: 150px;
  max-width: 200px;
}

/* Dropdown Container */
.custom-dropdown-container {
  display: flex;
  flex-direction: column;
  width: 180px; /* Adjust width as needed */
  position: relative;
  /* Ensures border-right ignores parent's padding */
  margin-top: -20px;
  margin-bottom: -20px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-right: 1px solid #ccc; /* Adjust color to match design */
  margin-left: 10px;
}
.custom-dropdown-container:last-child {
  border-right: none;
}

/* Label above dropdown */
.dropdown-label {
  font-size: 14px;
  color: #9e9e9e; /* Light grey text */
}

/* Custom dropdown wrapper to style */
.dropdown-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

/* Styled Select Dropdown */
.custom-dropdown {
  font-size: 16px;
  font-weight: bold;
  color: #000;
  width: 100%;
  border: none;
  background: transparent;
  appearance: none; /* Hide default dropdown arrow */
  cursor: pointer;
}

/* Custom dropdown arrow */
.dropdown-icon {
  position: absolute;
  right: 10px;
  font-size: 14px;
  pointer-events: none;
  color: #000;
}

/* Remove outline when focused */
.custom-dropdown:focus {
  outline: none;
}

.addbutton {
  background-color: #204cb5;
}

.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: none !important;
}

/* Doctor Name and Avatar */
.doctor-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.doctor-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.doctor-name {
  font-weight: bold;
}

.plus-icon {
  width: 18px; /* Adjust as needed */
  height: 18px;
  margin-right: 8px; /* Space between icon and text */
}

.action-icons {
  display: flex;
  align-items: center;
  gap: 10px; /* Space between icons */
}

.action-icon {
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.edit-icon {
  color: black; /* Blue for edit */
}

.delete-icon {
  color: black; /* Red for delete */
}

.action-icon:hover {
  transform: scale(1.1);
}
</style>
