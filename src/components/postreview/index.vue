<template>
  <Teleport to="body">
    <div v-if="isVisible" class="overlay">
      <div class="modal-content">
        <!-- Header -->
        <div class="top">
          <div class="head">
            <h2>Post Test Review</h2>
            <button class="close-btn" @click="closeModal">×</button>
          </div>

          <!-- Patient Details -->
          <div class="patient-info">
            <div class="flexrow">
              <img src="@/assets/pathogen/avatar.png" alt="Avatar" class="avatar" />
              <div>
                <h3>Cedar Pete</h3>
                <p>Male · 34 yr old</p>
              </div>
            </div>

            <div class="datetime-section">
              <div>
                <span class="label">Date</span>
                <p class="value"><strong>07 December, 2024</strong></p>
              </div>
              <div>
                <span class="label">Time</span>
                <p class="value"><strong>10:00 AM</strong></p>
              </div>
            </div>
          </div>
        </div>
        <!-- Date & Time -->

        <!-- Form Fields -->
        <div class="form-section">
          <div class="input-container">
            <div class="left-column">
              <label>Date & Time Review</label>
              <input type="text" disabled value="07 December, 2024 • 10:00 am" />
            </div>
            <div class="right-column">
              <div class="half-width">
                <label>Microscopic Description & Comments</label>
                <textarea readonly>Gram-positive cocci in clusters. No other significant organisms seen.</textarea>
              </div>
              <div class="half-width">
                <label>Possible Diagnosis</label>
                <textarea placeholder="Write possible diagnosis..." />
              </div>
            </div>
          </div>
        </div>

        <div class="signature-section">
          <label>Signature</label>

          <!-- Signature Box -->
          <div class="add-section" @click="toggleSignatureOptions">
            <div v-if="signatureImage">
              <img :src="signatureImage" alt="Signature" class="signature-preview" />
            </div>

            <div v-else class="signature-box">
              <img src="@/assets/pathogen/scribble.png" alt="Add Signature" class="scribble-icon" />
              <span> Add Signature</span>
            </div>
          </div>

          <!-- Signature Options -->
          <div v-if="showSignatureOptions" class="signature-options">
            <button class="option-btn" @click="openSignaturePad">✍️ Draw Signature</button>

            <label class="option-btn">
              🖼️ Upload Picture
              <input type="file" accept="image/*" class="hidden-input" @change="uploadSignature" />
            </label>
          </div>

          <!-- Signature Pad -->
          <div v-if="showSignaturePad" class="signature-pad">
            <VueSignaturePad ref="signaturePadRef" class="pad" />
            <div class="signature-actions">
              <button class="action-btn" @click="clearSignature">Reset</button>
              <button class="action-btn save-btn" @click="saveSignature">Save</button>
            </div>
          </div>
        </div>

        <div class="actions">
          <button class="submit-btn" @click="handleSubmit">Submit</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { VueSignaturePad } from 'vue-signature-pad'
const signaturePadRef = ref(null)
const signatureImage = ref('')
const showSignatureOptions = ref(false)
const showSignaturePad = ref(false)

const emit = defineEmits(['close', 'submit'])

const handleSubmit = () => {
  console.log('this is sig', signatureImage.value)
  emit('submit', signatureImage.value) // Send signature image data
  emit('close') // Close the modal
}

const toggleSignatureOptions = () => {
  showSignatureOptions.value = !showSignatureOptions.value
}

const openSignaturePad = () => {
  showSignaturePad.value = true
  toggleSignatureOptions()
}

const saveSignature = () => {
  if (signaturePadRef.value) {
    signatureImage.value = signaturePadRef.value.saveSignature().data
    showSignaturePad.value = false
    showSignatureOptions.value = false
  }
}

const clearSignature = () => {
  if (signaturePadRef.value) {
    signaturePadRef.value.clearSignature()
  }
}

const props = defineProps({
  isVisible: Boolean // Controls visibility from the parent
})

const signature = ref(null)
const fileInput = ref(null)

const closeModal = () => {
  emit('close')
}

// Handle signature upload
const triggerUpload = () => {
  fileInput.value.click()
}

const uploadSignature = event => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      signature.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
/* Overlay Background */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal Box */
.modal-content {
  background: white;
  width: 60%;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}
x .close-btn {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  color: #1a1a1a;
}

/* Patient Info */
.patient-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.datetime-section {
  display: flex;
  gap: 20px;
  font-size: 15px;
}

label {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 10px;
  display: block;
}

.value {
  font-size: 16px;
  font-weight: bold;
}

/* Form Section */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

/* Signature Section */

.signature-preview {
  width: 49%;
  max-height: 100px;
  object-fit: contain;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
}

.signature-pad {
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 10px;
  background: white;
  padding: 10px;
  width: 49%;
  height: 200px;
}

.signature-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.actions {
  display: flex;
  justify-content: flex-start; /* Align to the start */
  margin-bottom: 20px; /* Add margin below */
}

/* Submit button */
.submit-btn {
  background: #1919ff;
  color: white;
  padding: 10px 60px;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  align-self: flex-start;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #0f0fcf;
}

/* Hide file input */
.hidden-input {
  display: none;
}

.flexrow {
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.top {
  background-color: #eceff3;
  margin: -20px -20px 20px -20px; /* Negates modal-content padding */
  padding: 20px; /* Keep inner spacing */
  border-top-left-radius: 12px; /* Maintain rounded corners */
  border-top-right-radius: 12px;
}

.input-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.left-column {
  width: 49%;
}

.right-column {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.half-width {
  width: 50%;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e3eb;
  border-radius: 8px;
  font-size: 14px;
  background-color: transparent;
  color: #1a1a1a;
}

/* Adjust textarea height */
textarea {
  resize: none;
  min-height: 80px;
}
.signature-section {
  display: flex;
  flex-direction: column;
}
.signature-box {
  display: flex;
  background: #f2f8fd;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  color: #1a1a1a;
  font-weight: 600;
  width: 49%;
  cursor: pointer;
  height: 80px;
  align-items: center;
  justify-content: center;

  span {
    color: #204cb5;
  }
}

.signature-options {
  width: 50%;
}

.option-btn {
  margin-top: 10px;
  display: flex;
  background: #e0f0ff;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  color: #1a1a1a;
  font-weight: 600;
  width: 50%;
  cursor: pointer;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto; /* Center horizontally */
}

.scribble-icon {
  margin-right: 10px;
}
</style>
