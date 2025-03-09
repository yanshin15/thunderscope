<template>
  <div class="health-analyst">
    <div class="analyst-cards">
      <div v-for="(item, index) in analystData" :key="index" class="card">
        <div class="card-header">
          <div class="title">{{ item.title }}</div>
          <div class="value" :style="{ color: getPercentageTextColor(item.percentage) }">{{ item.percentage }}</div>
        </div>
        <div class="flexbar">
          <div class="progress-bar">
            <div
              class="progress"
              :style="{ width: `${item.percentage}%`, backgroundColor: getProgressBarColor(item.percentage) }"
            />
          </div>
          <div class="status" :class="getStatusClass(item.percentage)">
            {{ getStatusLabel(item.percentage) }}
          </div>
        </div>
        <p>{{ item.description }}</p>
        <div v-if="index === analystData.length - 1" class="recommendations-box">
          <div class="icon" />
          <div class="content">
            <h4>Recommendations:</h4>
            <ul>
              <li>Regular blood monitoring</li>
              <li>Dietary Sodium</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  analystData: {
    type: Array as () => {
      title: string
      icon: string
      iconColor: string
      percentage: number
      progressColor: string
      description: string
    }[],
    required: true
  }
})

// Method to get the status label based on percentage
const getStatusLabel = (percentage: number): string => {
  if (percentage < 30) return 'Low'
  if (percentage >= 30 && percentage <= 70) return 'Medium'
  return 'High'
}

// Method to get the status class based on percentage
const getStatusClass = (percentage: number): string => {
  if (percentage < 30) return 'low'
  if (percentage >= 30 && percentage <= 70) return 'medium'
  return 'high'
}

// Method to get the progress bar color based on percentage
const getProgressBarColor = (percentage: number): string => {
  if (percentage < 30) return '#35C8F4' // Red for Low
  if (percentage >= 30 && percentage <= 70) return '#616674' // Orange for Medium
  return '#FF1D3C' // Green for High
}

// Method to get the percentage text color based on percentage
const getPercentageTextColor = (percentage: number): string => {
  if (percentage < 30) return '#35C8F4' // Red for Low
  if (percentage >= 30 && percentage <= 70) return '#616674' // Orange for Medium
  return '#FF1D3C' // Green for High
}
</script>

<style scoped>
.health-analyst {
  font-family: Arial, sans-serif;
}

h2 {
  font-weight: bold;
  margin-bottom: 20px;
}

.analyst-cards {
  display: grid;
  gap: 20px; /* Spacing between cards */
}

.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
}

.title {
  font-weight: bold;
  font-size: 16px;
}

.value {
  font-weight: bold;
  font-size: 18px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 80%;
  transition: width 0.5s ease-in-out;
}
.flexbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

p {
  font-size: 14px;
  color: #555;
  margin: 10px 0;
  text-align: left;
}

.flexbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  transition: width 0.5s ease-in-out;
}

.status {
  font-size: 14px;
  font-weight: bold;
  color: #4285f4;
  background-color: #e6f7ff;
  padding: 4px 8px;
  border-radius: 12px;
}

.status.low {
  color: #35c8f4; /* Red for Low */
  background-color: #fff1f0;
}

.status.medium {
  color: #616674; /* Orange for Medium */
  background-color: #fffbe6;
}

.status.high {
  color: #ff1d3c; /* Green for High */
  background-color: #f6ffed;
}

.recommendations-box {
  display: flex;
  align-items: flex-start;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px;
}
.icon {
  background-color: #00c3ff;
  color: #fff;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
}
.icon::before {
  content: '✨'; /* Unicode for the sparkle icon */
  font-size: 20px;
}
.content {
  color: #333;
}
.content h4 {
  margin: 0;
  margin-bottom: 5px;
  font-size: 16px;
}
.content ul {
  list-style-type: disc;
  margin: 0;
  padding-left: 20px;
}
.content li {
  font-size: 14px;
  margin-bottom: 5px;
}
</style>
