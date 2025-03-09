// consultationStore.js
import { reactive } from 'vue'

// Reactive state for consultation data
const consultationState = reactive({
  notes: '',
  diagnosis: '',
  suggestion: '',
  followUpDate: '',
  medicines: [],
  signature: null
})

// Function to update consultation data
const setConsultationData = data => {
  Object.assign(consultationState, data)
}

// Export the reactive state and update function
export { consultationState, setConsultationData }
