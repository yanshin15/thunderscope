<template>
  <div class="health-dashboard">
    <div class="checkup-result">
      <h3>Checkup Result</h3>
      <div class="result-cards">
        <div v-for="(item, index) in checkupData" :key="index" class="card">
          <div class="card-icon">
            <span :style="{ color: item.iconColor }">{{ item.icon }}</span>
          </div>
          <div class="card-content">
            <h4>{{ item.title }}</h4>
            <p class="value">
              {{ item.value }} <span v-if="item.unit">{{ item.unit }}</span>
            </p>
            <span class="status" :class="{ normal: item.status === 'Normal', below: item.status === 'Below Standard' }">
              {{ item.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- Health Score and Recommendations -->
    <div class="recommendations">
      <h2>Health Score</h2>
      <div class="recommendations-container">
        <!-- Health Score SVG -->
        <div class="health-score">
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path
              class="circle-bg"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              class="circle"
              :stroke-dasharray="`${healthScore}, 100`"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" class="percentage">{{ healthScore }}%</text>
          </svg>
        </div>

        <!-- Recommendations Text -->
        <div class="recommendations-text">
          <h3><span class="icon">✨</span> <b>Personalized Recommendations:</b></h3>
          <ul>
            <li v-for="(recommendation, index) in recommendations" :key="index">
              {{ recommendation }}
            </li>
          </ul>
        </div>
      </div>
      <div class="healthnAnalysis">
        <HealthAnalyst :analyst-data="analystData" />
      </div>
      <div class="mealNutrition">
        <MealNutrition :summary="summaryData" :meals="mealData" />
      </div>
    </div>

    <!-- Checkup Result Cards -->
  </div>
</template>

<script setup lang="ts">
// Define props for health score, checkup data, and recommendations
import { defineProps } from 'vue'
import HealthAnalyst from '@/components/casedetailitems/healthanalysis.vue'
import MealNutrition from '@/components/casedetailitems/mealNutrition.vue'

defineProps({
  healthScore: { type: Number, required: true },
  checkupData: {
    type: Array as () => {
      title: string
      value: string | number
      unit?: string
      status: string
      icon: string
      iconColor?: string
    }[],
    required: true
  },
  recommendations: {
    type: Array as () => string[],
    required: true
  }
})

const analystData = [
  {
    title: 'BODY FAT',
    icon: '🔴',
    iconColor: '#e91e63',
    percentage: 30,
    progressColor: '#42a5f5',
    description:
      'Body Fat Percentage is the proportion of body weight to the total body weight. Higher body fat can damage your long term health.'
  },
  {
    title: 'VISCERAL FAT',
    icon: '🟠',
    iconColor: '#fb8c00',
    percentage: 30,
    progressColor: '#42a5f5',
    description:
      'Body Fat Percentage is the proportion of body weight to the total body weight. Higher body fat can damage your long term health.'
  },
  {
    title: 'SUBCUTANEOUS FAT',
    icon: '🔵',
    iconColor: '#42a5f5',
    percentage: 30,
    progressColor: '#42a5f5',
    description:
      'Body Fat Percentage is the proportion of body weight to the total body weight. Higher body fat can damage your long term health.'
  },
  {
    title: 'CHOLESTEROLE',
    icon: '🟠',
    iconColor: '#fb8c00',
    percentage: 30,
    progressColor: '#42a5f5',
    description:
      'Body Fat Percentage is the proportion of body weight to the total body weight. Higher body fat can damage your long term health.'
  }
]
const summaryData = [
  { label: 'Calories', value: 1176, unit: 'kcal' },
  { label: 'Proteins', value: 60.8, unit: 'g' },
  { label: 'Carbs', value: 43, unit: 'g' },
  { label: 'Fats', value: 43, unit: 'g' },
  { label: 'Fibres', value: 43, unit: 'g' }
]

const mealData = [
  {
    category: 'Breakfast',
    items: [
      { name: 'Dhaniya Putina Cuney', serving: '2 tbsp', calories: 28, carbs: 1.6, proteins: 2.8, fibres: 1.2 },
      { name: 'Besan Chilla', serving: '2 tbsp', calories: 28, carbs: 1.6, proteins: 2.8, fibres: 1.2 }
    ]
  },
  {
    category: 'Morning Snack',
    items: [
      { name: 'Chia Seeds', serving: '2 tbsp', calories: 28, carbs: 1.6, proteins: 2.8, fibres: 1.2 },
      { name: 'Pineapple', serving: '2 tbsp', calories: 28, carbs: 1.6, proteins: 2.8, fibres: 1.2 }
    ]
  }
]
</script>

<style scoped>
.health-dashboard {
  font-family: Arial, sans-serif;
  padding: 20px;
}

h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}
h2 {
  font-weight: bold;
  margin-bottom: 20px;
}
.checkup-result {
  margin-bottom: 30px;
}

.recommendations-container {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.health-score {
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circular-chart {
  width: 100px;
  height: 100px;
}

.circle-bg {
  fill: none;
  stroke: #f3f3f3;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke: #4285f4;
  stroke-width: 3.8;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.percentage {
  fill: #333;
  font-size: 0.5em;
  text-anchor: middle;
}

.recommendations-text h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.icon {
  font-size: 1.2em;
  color: #4285f4;
}

ul {
  padding-left: 20px;
  margin: 0;
  list-style-type: disc;
}

li {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

/* Checkup Cards */
.result-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.card {
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px;
}

.card-icon {
  font-size: 32px;
  margin-bottom: 10px;
}

.card-content h4 {
  font-size: 16px;
  margin: 5px 0;
}

.value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.status {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: bold;
}

.status.normal {
  background-color: #e0f7fa;
  color: #00796b;
}

.status.below {
  background-color: #ffebee;
  color: #c62828;
}
</style>
