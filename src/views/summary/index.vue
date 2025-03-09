<script setup lang="ts" name="Dashboard">
import { ref, onMounted, onUnmounted } from 'vue'
import { UserFilled, PhoneFilled, PieChartFilled } from '@element-plus/icons-vue'
import * as echarts from 'echarts'

const store = {
  barOptions: {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '5%', right: '5%', top: '10%', bottom: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['July', 'August', 'September', 'October', 'November', 'December'],
      axisLine: { lineStyle: { color: '#d3d3d3' } },
      axisLabel: { color: '#6b7280', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280', fontSize: 12 },
      splitLine: { lineStyle: { color: '#f2f2f2' } },
      splitNumber: 7
    },
    series: [
      {
        name: 'Consultations',
        type: 'bar',
        data: [200, 300, 250, 100, 150, 200],
        barWidth: '40%',
        itemStyle: { color: '#4f46e5', barBorderRadius: [4, 4, 0, 0] }
      }
    ]
  },
  pieOptions: {
    tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
    series: [
      {
        name: 'Consultation Calls',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false, position: 'outside' },
        emphasis: {
          label: {
            show: true,
            formatter: '{b}\n{c} ({d}%)',
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        data: [
          { value: 1650, name: 'Calls Answered', itemStyle: { color: '#4F46E5' } },
          { value: 250, name: 'Calls Rejected', itemStyle: { color: '#E11D48' } },
          { value: 100, name: 'Calls Missed', itemStyle: { color: '#0EA5E9' } }
        ]
      }
    ]
  }
}

const stats = ref([
  { name: 'Clinics', total: 563, icon: 'fas fa-hospital' },
  { name: 'Patients', total: 1288, icon: 'fas fa-user' },
  { name: 'Body Composition', total: 48, icon: 'fas fa-running' },
  { name: 'Blood Sugar', total: 148, icon: 'fas fa-tint' },
  { name: 'Hemoglobin', total: 56, icon: 'fas fa-vial' },
  { name: 'Blood Pressure', total: 108, icon: 'fas fa-heartbeat' },
  { name: 'Oxygen Saturation', total: 44, icon: 'fas fa-lungs' },
  { name: 'Body Temperature', total: 82, icon: 'fas fa-thermometer-half' },
  { name: 'HBAIC', total: 96, icon: 'fas fa-prescription-bottle-alt' },
  { name: 'Lipid', total: 20, icon: 'fas fa-vial' },
  { name: 'Ecg', total: 82, icon: 'fas fa-heart' },
  { name: 'Dermascape', total: 82, icon: 'fas fa-spa' },
  { name: 'Spirometer', total: 18, icon: 'fas fa-wind' },
  { name: 'Stethoscope', total: 4, icon: 'fas fa-stethoscope' },
  { name: 'Color Blindness', total: 8, icon: 'fas fa-eye' },
  { name: 'Mental Health', total: 40, icon: 'fas fa-brain' },
  { name: 'Ayurvedic', total: 16, icon: 'fas fa-leaf' },
  { name: 'Tuberculosis', total: 0, icon: 'fas fa-lungs-virus' },
  { name: 'Cough Test', total: 290, icon: 'fas fa-comment-medical' }
])

const selectedStat = ref(null)

const staticPopupData = {
  totalTests: 56,
  categories: [
    { label: 'Low', color: 'red', results: { Singapore: 15, 'New Delhi': 12, Jakarta: 5 } },
    { label: 'Normal', color: 'cyan', results: { Singapore: 12, 'New Delhi': 12, Jakarta: 2 } },
    { label: 'High', color: 'blue', results: { Singapore: 40, 'New Delhi': 20, Jakarta: 12 } }
  ]
}

const openSidebar = stat => {
  selectedStat.value = stat
  document.body.classList.add('no-scroll') // Prevent scrolling when sidebar is open
  nextTick(() => {
    initPieChart()
  })
}

const closeSidebar = () => {
  selectedStat.value = null
  document.body.classList.remove('no-scroll')
}

const initPieChart = () => {
  const chartDom = document.getElementById('pieChart')
  if (chartDom) {
    const myChart = echarts.init(chartDom)
    myChart.setOption(store.pieOptions)
  }
}

// Click outside to close
const handleClickOutside = event => {
  const sidebar = document.querySelector('.sidebar-container')
  if (selectedStat.value && sidebar && !sidebar.contains(event.target)) {
    closeSidebar()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container" :class="{ blurred: selectedStat }">
      <h1 class="heading">Summary</h1>

      <div class="stats-cards">
        <el-row :gutter="20">
          <el-col v-for="(stat, index) in stats" :key="index" :lg="4" :md="8" :sm="12">
            <el-card shadow="hover" class="stat-card" @click="openSidebar(stat)">
              <div class="stat-header">
                <div class="stat-icon">
                  <i :class="stat.icon" />
                </div>
                <div class="stat-content">
                  <div class="stat-name">{{ stat.name }}</div>
                  <div class="stat-total">{{ stat.total }}</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <div v-if="selectedStat" class="sidebar-overlay">
      <div class="sidebar-container">
        <div class="sidebar-header">
          <h2>{{ selectedStat.name }}</h2>
          <button class="close-btn" @click="closeSidebar">✖</button>
        </div>

        <div id="pieChart" class="pie-chart" />

        <div class="sidebar-content">
          <p class="total-tests">{{ staticPopupData.totalTests }} <span>Total Test</span></p>

          <div class="legend">
            <span
              v-for="category in staticPopupData.categories"
              :key="category.label"
              :style="{ color: category.color }"
            >
              ● {{ category.label }}
            </span>
          </div>

          <el-select placeholder="States" class="filter-item">
            <el-option label="All States" value="all-states" />
          </el-select>

          <div v-for="category in staticPopupData.categories" :key="category.label" class="category-section">
            <h3 :style="{ color: category.color }">{{ category.label }} result</h3>
            <ul>
              <li v-for="(value, key) in category.results" :key="key">
                <span class="state-name">{{ key }}</span>
                <span class="state-value">{{ value }}</span>
              </li>
            </ul>
          </div>

          <div class="loading">
            <span class="spinner" />
            <p>Loading more content...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$primary-color: #1976d2;
$secondary-color: #6b7280;
$background-color: #f9fbff;
$blur-background: rgba(0, 0, 0, 0.3);

.dashboard-wrapper {
  position: relative;
}

.dashboard-container {
  padding: 20px;
  background: $background-color;
  position: relative;
  transition: filter 0.3s ease;

  &.blurred {
    filter: blur(5px);
  }
}

.heading {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.stats-cards {
  margin-bottom: 20px;
}
.el-col {
  margin-bottom: 20px; // Ensures spacing between grid rows
}

.stat-card {
  height: 100%;
  text-align: center;
  padding: 20px;
  cursor: pointer;

  .stat-header {
    display: flex;
    flex-direction: column;
    align-items: center;

    .stat-icon i {
      font-size: 36px;
      color: $primary-color;
    }

    .stat-content {
      .stat-name {
        font-size: 16px;
        color: $secondary-color;
        margin-top: 10px;
      }

      .stat-total {
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
}

.sidebar-overlay {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: $blur-background;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: opacity 0.3s ease;
}

.sidebar-container {
  background: white;
  width: 40%;
  height: 100%;
  box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease;
  z-index: 100;
}
.chart-container {
  width: 100%;
  max-width: 250px; /* Adjust the size */
  margin: auto;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.total-tests {
  font-size: 36px;
  font-weight: bold;
  span {
    font-size: 16px;
    color: $secondary-color;
  }
}

.legend {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.category-section {
  h3 {
    margin-top: 15px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
    }
  }
}

.loading {
  text-align: center;
  margin-top: 20px;
}

.pie-chart {
  width: 100%;
  height: 250px;
  margin-top: 10px;
}
</style>
