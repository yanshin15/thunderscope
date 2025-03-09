<template>
  <Teleport to="body">
    <div v-if="isVisible" class="overlay">
      <div class="modal-content">
        <!-- Header -->
        <div class="head">
          <h2>Complete Review</h2>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="top">
          <!-- Patient Details -->
          <div class="patient-info">
            <div class="gap">
              <div>
                <h3 class="name">Mr. Bryan Mikel</h3>
                <p>Male, 47 years old</p>
              </div>
              <div>
                <p>Paradise Serpong City, J12/8</p>
                <p>South Tangerang, Indonesia</p>
                <p>087782326612</p>
              </div>
            </div>
            <div class="gap">
              <div>
                <p><strong>Mob. No:</strong> 924232233</p>
                <p><strong>ID:</strong> 11 - OPD6 PATIENT</p>
              </div>
              <div>
                <p><strong>Sample collected at</strong></p>
                <p>Siloam Hospital</p>
                <p>125, SilkRoad city, Orchard, Singapore</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Test Information -->
        <h3 class="section-title">DERMATOLOGY CERVIX BIOPSY</h3>
        <div class="test-details">
          <p><strong>REVIEW DATE & TIME: </strong> 24 February, 2025 at 10:00 AM</p>
          <p><strong>SPECIMEN TYPE: </strong> Skin Biopsy</p>
          <p><strong>SITE OF COLLECTION: </strong> Left Forearm</p>
          <p><strong>CLINICAL DATA: </strong> Nodular BCC, 173.51</p>
        </div>

        <!-- Images -->
        <div class="image-section">
          <img src="@/assets/pathogen/sample1.png" alt="Biopsy Image 1" />
          <img src="@/assets/pathogen/sample2.png" alt="Biopsy Image 2" />
        </div>

        <!-- Descriptions -->
        <div class="description-section">
          <div class="img-box">
            <h4>Microscopic Description & Comments</h4>
            <img src="@/assets/pathogen/edit.png" alt="Add Signature" class="scribble-icon" />
          </div>

          <p>
            The epidermis shows irregular acanthosis with focal areas of hyperkeratosis and parakeratosis. The
            dermo-epidermal junction is intact. The findings are consistent with squamous cell carcinoma. Complete
            excision with clear margins has been achieved. Clinical follow-up and sun protection are recommended.
          </p>
        </div>

        <div class="description-section">
          <div class="img-box">
            <h4>Diagnosis</h4>
            <img src="@/assets/pathogen/edit.png" alt="Add Signature" class="scribble-icon" />
          </div>

          <p>
            Invasive squamous cell carcinoma, moderately differentiated, involving the dermis. Margins are free of
            tumor.
          </p>
        </div>

        <div class="description-section">
          <h4>Gross Description</h4>
          <p>
            The specimen consists of a 0.5 × 0.4 × 0.3 cm skin ellipse with a central raised, firm, tan-white lesion.
            The surrounding skin appears unremarkable.
          </p>
        </div>

        <!-- Signature -->
        <div class="signature-section">
          <img v-if="signature" :src="signature" alt="Signature" class="signature-preview" />
          <p>Dr. Richardson, M.B.Bs</p>
          <p>MD Pathologist</p>
        </div>

        <!-- Action Buttons -->
        <div class="actions">
          <button class="finish-btn" @click="closeModal">Finish</button>
          <button class="export-btn" @click="handleSubmit">Export to PDF</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  isVisible: Boolean,
  signature: String // Receive signature image
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  // Convert array of IDs to a comma-separated string
  router.push({
    path: '/review',
    query: { signature: encodeURIComponent(props.signature) } // Pass as query param
  })
}
</script>

<style scoped>
/* Overlay */
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

.head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f9fbfd;
  padding: 20px;
  margin: -20px -20px 0 -20px; /* Pull the header outside the parent's padding */
  border-top-left-radius: 12px; /* Maintain rounded corners */
  border-top-right-radius: 12px;
}

/* Modal Box */
.modal-content {
  background: white;
  width: 50%;
  max-height: 95vh; /* Limit the height of the modal */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  font-family: 'Arial', sans-serif;
}

/* Header */
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}

h2 {
  font-size: 24px;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
}

/* Patient Info */
.patient-info {
  display: flex;
  flex-direction: row;
  gap: 240px;
  margin-top: 15px;
  font-size: 14px;
}

/* Section Title */
.section-title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

/* Test Details */
.test-details {
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
}

/* Image Section */
.image-section {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.image-section img {
  width: 35%;
  border-radius: 8px;
}

/* Description Sections */
.description-section {
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;

  h4 {
    margin-bottom: 10px;
  }
}

.description-section:last-child {
  border-bottom: none; /* Removes the bottom border from the last description-section */
}

.description-section h4 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.description-section p {
  font-size: 14px;
  color: #444;
}

/* Signature Section */
.signature-section {
  margin-top: 20px;
  font-style: italic;
}

/* Actions */
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}

.finish-btn {
  background: #1919ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  width: 100%;
}

.export-btn {
  background: white;
  color: #1919ff;
  border: 2px solid #1919ff;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  width: 100%;
}

.finish-btn:hover {
  background: #0f0fcf;
}

.export-btn:hover {
  background: #1919ff;
  color: white;
}

.gap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.scribble-icon {
  width: 15px;
  height: 15px;
}

.img-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.signature-preview {
  width: 25%;
}
</style>
