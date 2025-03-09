<template>
  <div class="patient-complaints">
    <h3>Patient Complaints</h3>
    <ul class="complaints-list">
      <li v-for="(complaint, index) in complaints" :key="index">
        {{ complaint }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// Define props to pass complaints as an array
defineProps({
  complaints: {
    type: Array as () => string[],
    required: true
  }
})
</script>

<style scoped>
.patient-complaints h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.complaints-list {
  list-style: disc;
  padding-left: 20px;
  font-size: 16px;
  color: #333;
}

.complaints-list li {
  margin-bottom: 10px; /* Adds space between list items */
  line-height: 1.5; /* Improves readability */
}
</style>
