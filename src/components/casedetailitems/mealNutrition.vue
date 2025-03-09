<template>
  <div class="meal-nutrition">
    <!-- Header -->
    <div class="nutrition-header">
      <h2>Meal Nutrition</h2>
      <p>Weight Loss Diabetes Non Veg-1200</p>
    </div>

    <!-- Day 1 Section -->
    <div class="day-section">
      <h3>DAY 1</h3>
    </div>

    <!-- Summary Cards -->
    <div class="summary-cards">
      <div v-for="(item, index) in summary" :key="index" class="summary-card">
        <p class="label">{{ item.label }}</p>
        <p class="value">
          <b>{{ item.value }}</b>
          <span v-if="item.unit" class="unit">{{ item.unit }}</span>
        </p>
      </div>
    </div>

    <!-- Meal Categories -->
    <div class="meal-categories">
      <div v-for="(meal, index) in meals" :key="index" class="meal-card">
        <h4 class="meal-title">{{ meal.category }}</h4>
        <div v-for="(item, idx) in meal.items" :key="idx" class="meal-item">
          <p class="item-name">
            <b>{{ item.name }}</b>
          </p>
          <div class="item-details">
            <div class="detail">
              <span>Serving</span> <span>{{ item.serving }}</span>
            </div>
            <div class="detail">
              <span>Calories</span> <span>{{ item.calories }}</span>
            </div>
            <div class="detail">
              <span>Carbs</span> <span>{{ item.carbs }}</span>
            </div>
            <div class="detail">
              <span>Proteins</span> <span>{{ item.proteins }}</span>
            </div>
            <div class="detail">
              <span>Fibres</span> <span>{{ item.fibres }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  summary: {
    type: Array as () => { label: string; value: string | number; unit?: string }[],
    required: true
  },
  meals: {
    type: Array as () => {
      category: string
      items: {
        name: string
        serving: string
        calories: number
        carbs: number
        proteins: number
        fibres: number
      }[]
    }[],
    required: true
  }
})
</script>

<style scoped>
/* General Styling */
.meal-nutrition {
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.nutrition-header {
  text-align: left;
  margin-bottom: 15px;
}

.nutrition-header h2 {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
}

.nutrition-header p {
  font-size: 14px;
  color: #888;
  margin: 5px 0 0;
}

/* Day Section */
.day-section {
  background-color: #2c3e50;
  color: #ffffff;
  text-align: left;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Summary Cards */
.summary-cards {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 10px;
  border-bottom: 1px solid #ddd;
}

.summary-card {
  text-align: center;
}

.summary-card .label {
  font-size: 12px;
  color: #888;
  margin-bottom: 5px;
}

.summary-card .value {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.summary-card .unit {
  font-size: 12px;
  font-weight: normal;
  color: #666;
  margin-left: 3px;
}

/* Meal Categories */
.meal-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.meal-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.meal-title {
  color: #1e88e5;
  font-size: 16px;
  margin-bottom: 10px;
  text-transform: capitalize;
  font-weight: bold;
}

.meal-item {
  margin-bottom: 10px;
}

.item-name {
  font-size: 14px;
  margin-bottom: 5px;
}

.item-details .detail {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #555;
}

.item-details .detail span {
  display: inline-block;
  min-width: 80px;
}
</style>
