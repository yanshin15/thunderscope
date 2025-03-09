<script setup lang="ts" name="Package">
import { ref, computed, onMounted } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { getPackages } from '@/utils/api'

const route = useRoute()
const router = useRouter()

import dayjs from 'dayjs'

const formattedDateRange = computed(() => {
  return dateRange.value.map(date => dayjs(date).format('DD/MM/YYYY'))
})

const addPackage = () => {
  if (packages.value.length > 0) {
    const lastPackageId = packages.value[packages.value.length - 1].id
    router.push({ path: '/addpackage', query: { lastId: lastPackageId } })
  } else {
    router.push('/addpackage')
  }
}
const dateRange = ref([dayjs().format('YYYY-MM-DD'), dayjs().add(7, 'day').format('YYYY-MM-DD')])

const packages = ref([
  {
    id: '1',
    name: 'Elderly Package',
    tests: 'Height, Weight, temperature, oximeter, Spirometer, Blood Pressure, Body Fat Analysis',
    testCount: 8,
    totalCustomers: 10892,
    lastUpdate: '23 January, 2025'
  },
  {
    id: '2',
    name: 'Kids Package',
    tests: 'Height, Weight, temperature, oximeter, Spirometer, Blood Pressure, Body Fat Analysis',
    testCount: 8,
    totalCustomers: 10892,
    lastUpdate: '23 January, 2025'
  },
  {
    id: '3',
    name: 'Women Package',
    tests: 'Height, Weight, temperature, oximeter, Spirometer, Blood Pressure, Body Fat Analysis',
    testCount: 8,
    totalCustomers: 10892,
    lastUpdate: '23 January, 2025'
  },
  {
    id: '4',
    name: 'Diabetic Package',
    tests: 'Height, Weight, temperature, oximeter, Spirometer, Blood Pressure, Body Fat Analysis',
    testCount: 8,
    totalCustomers: 10892,
    lastUpdate: '23 January, 2025'
  },
  {
    id: '5',
    name: 'Heart Health Package',
    tests: 'ECG, Blood Pressure, Cholesterol, Lipid Profile, Heart Rate Analysis',
    testCount: 5,
    totalCustomers: 5402,
    lastUpdate: '15 February, 2025'
  },
  {
    id: '6',
    name: 'Vision Package',
    tests: 'Color Blindness, Eye Pressure, Vision Acuity, Retinal Imaging',
    testCount: 4,
    totalCustomers: 3201,
    lastUpdate: '10 March, 2025'
  },
  {
    id: '7',
    name: 'Senior Care Package',
    tests: 'Height, Weight, temperature, oximeter, Spirometer, Blood Pressure, Body Fat Analysis',
    testCount: 8,
    totalCustomers: 10892,
    lastUpdate: '23 January, 2025'
  },
  {
    id: '8',
    name: 'Lung Health Package',
    tests: 'Spirometer, Oxygen Saturation, Cough Test, Chest X-ray',
    testCount: 4,
    totalCustomers: 7893,
    lastUpdate: '12 April, 2025'
  },
  {
    id: '9',
    name: 'Diabetes Care Package',
    tests: 'Blood Sugar, HBA1C, Insulin Levels, Lipid Profile',
    testCount: 4,
    totalCustomers: 6542,
    lastUpdate: '7 May, 2025'
  },
  {
    id: '10',
    name: 'General Checkup',
    tests: 'Height, Weight, Blood Pressure, Temperature, Basic Blood Work',
    testCount: 5,
    totalCustomers: 20530,
    lastUpdate: '3 June, 2025'
  },
  {
    id: '11',
    name: 'Elderly Package',
    tests: 'Height, Weight, temperature, oximeter, Spirometer, Blood Pressure, Body Fat Analysis',
    testCount: 8,
    totalCustomers: 10892,
    lastUpdate: '23 January, 2025'
  },
  {
    id: '12',
    name: 'Fitness Package',
    tests: 'BMI, Muscle Mass, Body Fat Percentage, Heart Rate Analysis',
    testCount: 4,
    totalCustomers: 4392,
    lastUpdate: '22 July, 2025'
  }
])

onMounted(() => {
  const { id, name, tests, totalCustomers, testCount, lastUpdate } = route.query

  if (id && name && tests && testCount && lastUpdate) {
    console.log('Received routed data:', {
      id,
      name,
      tests,
      totalCustomers,
      testCount,
      lastUpdate
    })

    packages.value.push({
      id: id as string,
      name: name as string,
      tests: JSON.parse(tests as string).join(', '), // Convert array to string for display
      testCount: Number(testCount),
      totalCustomers: Number(totalCustomers),
      lastUpdate: lastUpdate as string
    })

    console.log('Updated packages:', packages.value)
  }
})

const packages2 = ref([
  {
    id: 'P-001',
    name: 'John Doe',
    state: 'Singapore',
    clinic: 'Clinic Name',
    gender: 'Male',
    age: '49 yo',
    package: 'Elderly Care Package'
  },
  {
    id: 'P-002',
    name: 'Cristiano Ronaldo',
    state: 'Singapore',
    clinic: 'Clinic Name',
    gender: 'Male',
    age: '49 yo',
    package: 'Elderly Care Package'
  },
  {
    id: 'P-003',
    name: 'Cipto Mangunkusumo',
    state: 'Singapore',
    clinic: 'Clinic Name',
    gender: 'Male',
    age: '49 yo',
    package: 'Elderly Care Package'
  },
  {
    id: 'P-004',
    name: 'Carolus',
    state: 'Singapore',
    clinic: 'Clinic Name',
    gender: 'Male',
    age: '49 yo',
    package: 'Elderly Care Package'
  },
  {
    id: 'P-005',
    name: 'Jendral Soedirman',
    state: 'Singapore',
    clinic: 'Clinic Name',
    gender: 'Male',
    age: '49 yo',
    package: 'Elderly Care Package'
  },
  {
    id: 'P-006',
    name: 'Luvia',
    state: 'Singapore',
    clinic: 'Clinic Name',
    gender: 'Male',
    age: '49 yo',
    package: 'Elderly Care Package'
  },
  {
    id: 'P-007',
    name: 'Clinic Quezon',
    state: 'Singapore',
    clinic: 'Clinic Name',
    gender: 'Male',
    age: '49 yo',
    package: 'Elderly Care Package'
  },
  {
    id: 'P-008',
    name: 'Prabowo Subianto',
    state: 'Singapore',
    clinic: 'Clinic Name',
    gender: 'Male',
    age: '49 yo',
    package: 'Elderly Care Package'
  },
  {
    id: 'P-009',
    name: 'Brayen Binar Putra',
    state: 'Singapore',
    clinic: 'Clinic Name',
    gender: 'Male',
    age: '49 yo',
    package: 'Elderly Care Package'
  },
  {
    id: 'P-006',
    name: 'Luvia',
    state: 'Singapore',
    clinic: 'Clinic Name',
    gender: 'Male',
    age: '49 yo',
    package: 'Elderly Care Package'
  },
  {
    id: 'P-007',
    name: 'Clinic Quezon',
    state: 'Singapore',
    clinic: 'Clinic Name',
    gender: 'Male',
    age: '49 yo',
    package: 'Elderly Care Package'
  },
  {
    id: 'P-008',
    name: 'Prabowo Subianto',
    state: 'Singapore',
    clinic: 'Clinic Name',
    gender: 'Male',
    age: '49 yo',
    package: 'Elderly Care Package'
  },
  {
    id: 'P-009',
    name: 'Brayen Binar Putra',
    state: 'Singapore',
    clinic: 'Clinic Name',
    gender: 'Male',
    age: '49 yo',
    package: 'Elderly Care Package'
  },
  {
    id: 'P-010',
    name: 'Li Kuan Young',
    state: 'Singapore',
    clinic: 'Clinic Name',
    gender: 'Male',
    age: '49 yo',
    package: 'Elderly Care Package'
  }
])

const currentPagePackages = ref(1) // First table pagination
const currentPagePackages2 = ref(1) // Second table pagination
const pageSize = ref(10)

const paginatedData = computed(() => {
  const start = (currentPagePackages.value - 1) * pageSize.value
  const end = start + pageSize.value
  return packagesb.value.slice(start, end) // ✅ Now uses packagesb
})

const paginatedPackages2 = computed(() => {
  const start = (currentPagePackages2.value - 1) * pageSize.value
  const end = start + pageSize.value
  return packages2.value.slice(start, end)
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
  title: 'Total Package',
  value: '40',
  percentage: '8.5%',
  description: ' Up from last month'
})
const packageStats = ref([
  { title: 'Custom Package', value: '10,892', description: 'Customers' },
  { title: 'Kids Package', value: '928', percentage: '8.5%', description: 'Customers' },
  { title: 'Elderly Package', value: '4,928', percentage: '8.5%', description: 'Customers' },
  { title: 'Kids Package', value: '928', percentage: '8.5%', description: 'Customers' },
  { title: 'Elderly Package', value: '4,928', percentage: '8.5%', description: 'Customers' },
  { title: 'Women Package', value: '16', percentage: '8.5%', description: 'Customers' }
])

const selectedState = ref('All State')
const selectedClinic = ref('All Clinic')
const selectedGender = ref('All Gender')
const selectedAge = ref('All Age')
const selectedPackage = ref('All Package')

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

const states = ref(['California', 'Texas', 'New York', 'Florida', 'Illinois'])

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
const packagesb = ref([])

const fetchpackages = async () => {
  try {
    const response = await getPackages()
    const data = response.data
    console.log('🔍 Raw Data:', data)

    packagesb.value = data.map(item => ({
      id: decodeURIComponent(item.id),
      image: decodeURIComponent(item.icon || 'testimage'),
      name: decodeURIComponent(item.name || 'Unknown'),
      test: fixTestsJson(item.tests) // ✅ Use function to fix and parse tests JSON
    }))

    console.log('✅ Parsed Response Data:', data)
    console.log('✅ Cleaned Package List:', packagesb.value)
    console.log('✅ Cleaned test List:', packagesb.value)
  } catch (error) {
    console.error('❌ Fetching packages failed:', error)
  }
}

const fixTestsJson = (rawTests: string): any[] => {
  if (!rawTests || typeof rawTests !== 'string') return []

  try {
    let fixedJson = rawTests
      .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*=/g, '$1"$2":') // Fix property names
      .replace(/=/g, ':') // Replace any remaining `=` with `:`
      .replace(/(\s*:\s*)([A-Za-z]+)/g, '$1"$2"') // Ensure values (like WEIGHT) are quoted
      .replace(/data:"image"\/png/g, 'data:image/png') // Fix base64 `data:image/png`
      .replace(/"BLOOD"\s+PRESSURE/g, '"BLOOD PRESSURE"') // Fix misplaced quotes
      .replace(/'/g, '"') // Convert single quotes to double quotes
      .replace(/\]\s*,\s*\[/g, ',') // Merge broken arrays
      .replace(/::/g, '') // Remove accidental "::"
      .trim() // Trim spaces

    fixedJson = `[${fixedJson}]` // Ensure it is wrapped as an array

    return JSON.parse(fixedJson)
  } catch (error) {
    console.error('❌ Error parsing tests JSON:', error)
    return []
  }
}

onMounted(async () => {
  try {
    console.log('Fetching Patients...')
    await fetchpackages() // ✅ Ensure data is fetched
  } catch (error) {
    console.error('Failed to fetch patients:', error)
  }
})

const extractTestNames = (tests: any): string => {
  if (!Array.isArray(tests)) return 'No Tests Available'

  return tests
    .flat() // Flatten nested arrays
    .map(test => test.name) // Extract test names
    .join(', ') // Join names as a string
}

const getTestCount = (tests: any): number => {
  if (!Array.isArray(tests)) return 0 // Return 0 if tests is not an array
  return tests.flat().length // Flatten and count the number of test items
}

const getRandomCustomerCount = (): number => {
  return Math.floor(Math.random() * 25) + 1 // Generate a number between 1-25
}

const getTodayDate = (): string => {
  return dayjs().format('DD MMMM, YYYY') // Format: "06 February, 2025"
}
</script>

<template>
  <div class="dashboard-container">
    <!-- Page Header -->
    <div class="header-container">
      <h1 class="heading">Package</h1>
      <el-button class="addbutton" type="primary" size="large" @click="addPackage()">
        <img src="@/assets/plus.png" alt="Plus Icon" class="plus-icon" />
        New Package
      </el-button>
    </div>

    <!-- Package Summary Cards -->
    <!-- <el-row :gutter="20" class="package-summary">
      <el-col v-for="(stat, index) in packageStats" :key="index" :lg="4" :md="8" :sm="12">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <h2 class="stat-title">{{ stat.title }}</h2>
            <p class="stat-value">{{ stat.value }}</p>
            <p v-if="stat.percentage" class="stat-percentage">⬆ {{ stat.percentage }}</p>
            <p class="stat-description">{{ stat.description }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row> -->

    <div class="dashboard-container">
      <!-- Package Summary Container -->
      <div class="package-summary-container">
        <!-- Total Package Card (Fixed on Left) -->
        <div class="stat-card wide-card">
          <div class="stat-content">
            <h2 class="stat-title">{{ packagestattotal.title }}</h2>
            <p class="stat-value">{{ packagestattotal.value }}</p>
            <p v-if="packagestattotal.percentage" class="stat-percentage">
              <img src="@/assets/up-icon.png" alt="trend icon" class="trend-icon" />{{ packagestattotal.percentage }}
              <span class="stat-description"> {{ packagestattotal.description }}</span>
            </p>
          </div>
        </div>

        <!-- Left Arrow Button -->
        <button class="arrow-button left" :disabled="currentPage === 0" @click="prevPage">◀</button>

        <!-- Sliding Cards Wrapper -->
        <div class="slider-wrapper">
          <div class="package-summary" :style="{ transform: `translateX(-${currentPage * 100}%)` }">
            <div v-for="(stat, index) in packageStats" :key="index" class="stat-card">
              <div class="stat-content">
                <h2 class="stat-title">{{ stat.title }}</h2>
                <div class="flexrowno">
                  <p class="stat-value">{{ stat.value }}</p>
                  <p v-if="stat.percentage" class="stat-percentage">
                    <img src="@/assets/up-icon.png" alt="trend icon" class="trend-icon" /> {{ stat.percentage }}
                  </p>
                </div>
                <p class="stat-description">{{ stat.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Arrow Button -->
        <button class="arrow-button right" :disabled="currentPage === totalPages - 1" @click="nextPage">▶</button>
      </div>
    </div>

    <!-- Filters -->

    <!-- Package Table -->
    <el-card shadow="hover" class="table-container">
      <div class="filters">
        <el-date-picker
          v-model="formattedDateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="Start Date"
          end-placeholder="End Date"
          format="DD/MM/YYYY"
          value-format="YYYY-MM-DD"
          class="custom-date-range"
        />
        <el-select placeholder="Filter Test" class="filter-item">
          <el-option label="4 Selected" value="4-selected" />
        </el-select>
      </div>
      <div>
        <div class="flexrow">
          <h2 class="table-title">40 Package</h2>
          <!-- Pagination -->
          <el-pagination
            v-model:current-page="currentPagePackages"
            :page-size="pageSize"
            :total="packagesb.length"
            layout="prev, pager, next"
            class="pagination"
            @current-change="handlePageChangePackages"
          />
        </div>
        <el-table :data="paginatedData" style="width: 100%" :row-style="{ height: '70px' }">
          <el-table-column prop="id" label="ID" width="120" />
          <el-table-column prop="name" label="Package" width="200">
            <template #default="{ row }">
              <strong>{{ row.name }}</strong>
            </template>
          </el-table-column>
          <el-table-column prop="tests" label="Tests in package">
            <template #default="{ row }">
              {{ extractTestNames(row.test) }}
            </template>
          </el-table-column>
          <el-table-column label="# Test" width="100">
            <template #default="{ row }">
              {{ getTestCount(row.test) }}
            </template>
          </el-table-column>
          <el-table-column label="Total Customers" width="150">
            <template #default>
              {{ getRandomCustomerCount() }}
            </template>
          </el-table-column>
          <el-table-column label="Last update" width="150">
            <template #default>
              {{ getTodayDate() }}
            </template>
          </el-table-column>
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
    <div class="seperatetitle">Customer's Package</div>
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
      <!-- <el-date-picker
          v-model="formattedDateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="Start Date"
          end-placeholder="End Date"
          format="DD/MM/YYYY"
          value-format="YYYY-MM-DD"
          class="filter-item"
        /> -->
    </div>
    <el-card shadow="hover" class="table-container">
      <!-- Filters for Customers' Package Table -->
      <div>
        <div class="flexrow">
          <h2 class="table-title">18,928 Customers</h2>
          <!-- Pagination -->
          <el-pagination
            v-model:current-page="currentPagePackages2"
            :page-size="pageSize"
            :total="packages2.length"
            layout="prev, pager, next"
            class="pagination"
            @current-change="handlePageChangePackages2"
          />
        </div>
        <el-table :data="paginatedPackages2" style="width: 100%" :row-style="{ height: '45px' }" class="custom-table">
          <el-table-column prop="id" label="ID" width="120" />
          <el-table-column prop="name" label="Customer">
            <template #default="{ row }">
              <strong class="customer-name">{{ row.name }}</strong>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="State" width="150" />
          <el-table-column prop="clinic" label="Clinic" width="200" />
          <el-table-column prop="gender" label="Gender" width="120" />
          <el-table-column prop="age" label="Age" width="100" />
          <el-table-column prop="package" label="Package" width="200" />
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

// /* Stats Cards */
// .package-summary {
//   display: flex;
//   margin-bottom: 20px;
// }

// .stat-card {
//   padding: 20px;
//   text-align: center;
//   min-height: 175px;
// }

// .stat-content {
//   .stat-title {
//     font-size: 16px;
//     font-weight: bold;
//     color: #333;
//   }
//   .stat-value {
//     font-size: 24px;
//     font-weight: bold;
//     color: #000;
//   }
//   .stat-percentage {
//     font-size: 12px;
//     color: #10b981;
//   }
//   .stat-description {
//     font-size: 12px;
//     color: #6b7280;
//   }
// }

.package-summary-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #f9fbff;
  border-radius: 12px;
  width: 100%;
  position: relative;
  align-items: stretch;
}

/* Total Package Card - Left Side */
.wide-card {
  flex: 0 0 300px; /* Adjust width as needed */
  max-width: 300px;
  background: #ffffff;
  padding: 20px;
  text-align: center;
  color: black;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
}

.slider-wrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.package-summary {
  display: flex;
  transition: transform 0.4s ease-in-out;
  width: 100%;
  gap: 17px;
}

.stat-card {
  flex: 0 0 calc(100% / 4 - 15px); /* 4 Cards Per View */
  max-width: calc(100% / 4 - 15px);
  background: #ffffff;
  padding: 20px;
  text-align: left; /* Centers text horizontally */
  color: black;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  display: flex;
  flex-direction: row; /* Stack text vertically */
  justify-content: start; /* Center text vertically */
  align-items: center; /* Ensure horizontal centering */
  min-height: 140px;
}

.stat-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #000;
}

.stat-percentage {
  font-size: 12px;
  color: #10b981;
  display: flex;
  align-items: center;
}

.stat-description {
  font-size: 12px;
  color: #6b7280;
}

/* Arrows */
.arrow-button {
  background-color: transparent;
  border: none;
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
}

.arrow-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
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
