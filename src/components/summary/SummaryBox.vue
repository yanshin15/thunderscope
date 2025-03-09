<template>
  <div class="summary-box" @click="openModal">
    <div class="icon">
      <img src="./testicon.png" alt="" />
    </div>
    <div class="content">
      <p class="title">{{ title }}</p>
      <p class="value">{{ value }}</p>
    </div>
  </div>

  <Modal :is-visible="isModalVisible" :title="title" :value="value" @update:is-visible="isModalVisible = $event" />
</template>

<script lang="ts">
import Modal from '@/components/data-modal/Modal.vue'
import {
  getClinics,
  getPatients,
  getBodyComposition,
  getBloodSugar,
  getHemoglobin,
  getBloodPressure,
  getOxygenSaturation,
  getBodyTemperature
} from '@/utils/api'

export default {
  components: {
    Modal
  },
  props: {
    icon: String,
    title: String,
    type: String // Determines which API to call
  },
  data() {
    return {
      isModalVisible: false,
      value: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    openModal() {
      this.isModalVisible = true
    },

    async fetchData() {
      try {
        let response

        // Use a switch statement to call the appropriate API
        switch (this.type) {
          case 'clinics':
            response = await getClinics()
            break
          case 'patients':
            response = await getPatients()
            break
          case 'body-composition':
            response = await getBodyComposition()
            break
          case 'blood-sugar':
            response = await getBloodSugar()
            break
          case 'hemoglobin':
            response = await getHemoglobin()
            break
          case 'blood-pressure':
            response = await getBloodPressure()
            break
          case 'oxygen-saturation':
            response = await getOxygenSaturation()
            break
          case 'body-temperature':
            response = await getBodyTemperature()
            break
          default:
            console.error(`Invalid type: ${this.type}`)
            return
        }

        this.value = response.data ?? 0
      } catch (error) {
        console.error(`Error fetching data for ${this.type}:`, error)
      }
    }
  }
}
</script>

<style scoped>
.summary-box {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  background-color: #ffff;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  width: 200px;
  height: 200px;
  margin: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  user-select: none;
}

.icon img {
  width: 60px;
  height: 60px;
  margin-bottom: 8px;
}

.title,
.value {
  user-select: none;
}

.title {
  margin-top: 8px;
  font-weight: 300;
  font-size: 14px;
  color: #333;
}

.value {
  margin-top: 8px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
</style>
