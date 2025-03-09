<template>
  <div class="health-analyst">
    <h2>Health Analyst</h2>
    <div class="analyst-cards">
      <div v-for="(item, index) in analystData" :key="index" class="card">
        <div class="card-header">
          <div class="icon" :style="{ backgroundColor: item.iconColor }">
            {{ item.icon }}
          </div>
          <div class="title">{{ item.title }}</div>
          <div class="value">{{ item.percentage }}%</div>
        </div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: `${item.percentage}%`, backgroundColor: item.progressColor }" />
        </div>
        <p>{{ item.description }}</p>
        <div class="status">High</div>
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
  grid-template-columns: repeat(2, 1fr); /* Exactly 2 cards per row */
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
  height: 100%;
  transition: width 0.5s ease-in-out;
}

p {
  font-size: 14px;
  color: #555;
  margin: 10px 0;
}

.status {
  align-self: flex-end;
  font-size: 14px;
  font-weight: bold;
  color: #4285f4;
  background-color: #e6f7ff;
  padding: 4px 8px;
  border-radius: 12px;
}
</style>
