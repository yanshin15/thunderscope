<template>
  <div v-if="isVisible" class="modal" @click.self="closeModal">
    <div class="modal-content" :class="modalClass">
      <div class="modal-header">
        <div class="header-wrapper">
          <h3>{{ title }}</h3>
          <div class="close-btn" @click="closeModal">X</div>
        </div>
        <hr class="divider" />
      </div>

      <!-- Pie Chart Section -->
      <div class="chart-container">
        <div class="pie-chart-wrapper">
          <PieChart />
        </div>
        <div class="chart-text">
          <p class="total-tests">{{ value }}</p>
          <p class="total-label">Total Tests</p>
        </div>
      </div>

      <button class="states-button">
        States
        <span class="arrow">˅</span>
      </button>

      <div v-if="!loading" class="results-container">
        <div v-for="(categoryData, category) in resultsByCategory" :key="category" class="result-section">
          <h4 class="section-title">{{ getLevelTitle(category) }}</h4>
          <ul>
            <li v-for="(count, state) in categoryData" :key="state" class="state-result">
              <span :class="['color-box', getColorClass(category)]" />
              <span class="state">{{ state }}</span>
              <span class="value">{{ count }}</span>
              <hr class="faint-line" />
            </li>
          </ul>
        </div>
      </div>
      <p v-if="loading" class="loading-text">Loading more content...</p>
    </div>
  </div>
</template>

<script>
import PieChart from '@/components/pie-chart/PieChart.vue'
import { getHemoglobinCountByStateAndLevel } from '@/utils/api'

export default {
  components: {
    PieChart
  },
  props: {
    isVisible: Boolean,
    title: String,
    value: Number
  },
  data() {
    return {
      resultsByCategory: {
        low: {},
        normal: {},
        high: {}
      },
      loading: true
    }
  },
  computed: {
    modalClass() {
      return {
        visible: this.isVisible
      }
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.fetchStateResults()
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:is-visible', false)
    },
    getLevelTitle(category) {
      const levels = {
        low: 'Low result by states',
        normal: 'Normal result',
        high: 'High result'
      }
      return levels[category] || 'Unknown Level'
    },
    getColorClass(category) {
      const colorClasses = {
        low: 'color-low',
        normal: 'color-normal',
        high: 'color-high'
      }
      return colorClasses[category]
    },
    async fetchStateResults() {
      console.log('fetchStateResults called')
      this.loading = true
      console.log(this.resultsByCategory)
      const states = ['Singapore', 'New Delhi', 'Jakarta']
      const categories = ['Low', 'Normal', 'High']

      for (const category of categories) {
        for (const state of states) {
          try {
            const response = await getHemoglobinCountByStateAndLevel(state, category)
            console.log(`Data for ${state}, ${category}:`, response.data)
            this.resultsByCategory[category.toLowerCase()][state] = response.data
            console.log(this.resultsByCategory)

            console.log(`Updated resultsByCategory for ${category.toLowerCase()}:`, this.resultsByCategory)
          } catch (error) {
            console.error(`Error fetching data for ${state} and ${category}:`, error)
          }
        }
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  padding: 20px;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}

.modal-header {
  text-align: center;
  margin-bottom: 20px;
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-tests {
  font-weight: bold;
  font-size: 24px;
}

.close-btn {
  font-size: 24px;
  font-weight: bold;
  color: #747171;
  cursor: pointer;
}

.divider {
  margin: 10px 0;
  border: none;
  border-top: 1px solid #ddd;
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.pie-chart-wrapper {
  flex-shrink: 0;
}

.chart-text {
  margin-left: 20px;
  font-size: 1.2em;
  color: #333;
}

.results-container {
  margin-top: 20px;
}

.result-section {
  padding-bottom: 10px;
}

.section-title {
  font-size: 1.25em;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.state-result {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.color-box {
  width: 12px;
  height: 12px;
  margin-right: 10px;
  border-radius: 2px;
}

.color-low {
  background-color: #ff5252;
}
.color-normal {
  background-color: #4caf50;
}
.color-high {
  background-color: #2196f3;
}

.state {
  flex: 1;
  font-weight: 500;
}

.value {
  color: #333;
}

.faint-line {
  margin: 2px 0;
  border: none;
  border-top: 1px solid #000000;
}

.states-button {
  display: flex;
  gap: 50px;
  margin: 10px 0;
  padding: 10px 15px;
  background: transparent;
  border: 2px solid #ccc;
  color: #333;
  font-weight: bold;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  width: auto;
}

.states-button:hover {
  background: #f1f1f1;
  border-color: #999;
}

.loading-text {
  text-align: center;
  color: #888;
  font-size: 14px;
  margin-top: 20px;
}
</style>
