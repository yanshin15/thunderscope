<template>
  <div class="pie-chart-container">
    <div class="pie-chart-wrapper">
      <Pie :data="pieData" :options="pieOptions" />
    </div>
    <!-- Custom Legend Below the Chart -->
    <div class="pie-chart-legend">
      <div v-for="(color, index) in pieData.datasets[0].backgroundColor" :key="index" class="legend-item">
        <span class="color-box" :style="{ backgroundColor: color }" />
        <span class="legend-label">{{ pieData.labels[index] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  data() {
    return {
      pieData: {
        labels: ['Low', 'Normal', 'High'], // Update labels to Low, Normal, and High
        datasets: [
          {
            data: [60, 30, 10], // Adjust the percentage data as needed
            backgroundColor: ['#ff5252', '#4caf50', '#2196F3'], // Colors for Low, Normal, High
            borderWidth: 0
          }
        ]
      },
      pieOptions: {
        responsive: true, // Make chart responsive
        plugins: {
          legend: {
            display: false // Hide the default legend
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.pie-chart-wrapper {
  width: 150px; /* Reduced width for a smaller chart */
  height: 150px; /* Reduced height for a smaller chart */
  margin-bottom: 15px; /* Space between chart and legend */
}

.pie-chart-legend {
  display: flex;
  justify-content: center;
  gap: 20px; /* Space between the color boxes */
}

.legend-item {
  display: flex;
  align-items: center;
}

.color-box {
  width: 10px;
  height: 10px;
  margin-right: 0px;
  border-radius: 50%;
}

.legend-label {
  font-size: 14px;
  font-weight: 500;
}
</style>
