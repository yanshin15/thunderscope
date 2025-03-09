<template>
  <div class="full-continer">
    <div class="modal-content">
      <!-- Header -->
      <div class="head">
        <div>
          <img src="@/assets/pathogen/reviewlogo.png" alt="Add Signature" class="logoicon" />
        </div>
        <div>
          <h1>Pathogen Test Report</h1>
          <img src="@/assets/pathogen/share.png" alt="Add Signature" class="scribble-icon" />
        </div>
      </div>
      <div>
        <img src="@/assets/pathogen/barcode.png" alt="Barcode" class="barcode" />
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
          <div>
            <img src="@/assets/pathogen/qrcode2.png" alt="Add Signature" class="qrcode" />
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
        </div>

        <p>
          Invasive squamous cell carcinoma, moderately differentiated, involving the dermis. Margins are free of tumor.
        </p>
      </div>
      <div class="description-section">
        <h4>Immunohistochemical Stains</h4>
        <div class="stains-container">
          <div class="stains-image">
            <img src="@/assets/pathogen/greenstuff.png" alt="Immunohistochemical Stain Image" />
          </div>
          <div class="stains-content">
            <ul>
              <li><strong>PAS stain:</strong> Negative for fungal organisms.</li>
              <li><strong>AE1/AE3:</strong> Positive in tumor cells, confirming epithelial origin.</li>
              <li><strong>Ki-67:</strong> High proliferative index in tumor cells.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="description-section">
        <h4>Gross Description</h4>
        <p>
          The specimen consists of a 0.5 × 0.4 × 0.3 cm skin ellipse with a central raised, firm, tan-white lesion. The
          surrounding skin appears unremarkable.
        </p>
      </div>

      <!-- Signature -->
      <div class="signature-section">
        <img v-if="signature" :src="signature" alt="Signature" class="signature-preview" />
        <p>Dr. Richardson, M.B.Bs</p>
        <p>MD Pathologist</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const signature = ref(decodeURIComponent(route.query.signature || ''))

const props = defineProps({
  isVisible: Boolean
})
</script>

<style scoped>
/* Full container (Modal Overlay) */
/* Full Container (Make it Scrollable) */
.full-continer {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align modal to the top initially */
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow-y: auto; /* Enables scrolling */
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9fbfd;
  margin: -25px -25px 0 -25px; /* Pull the header outside the parent's padding */
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

/* First div (Logo) takes 20% of the width */
.head > div:first-child {
  width: 15%;
  display: flex;
  align-items: start;
  justify-content: center; /* Center the logo horizontally */
}

/* Second div (Title and Share Icon) takes the rest */
.head > div:last-child {
  width: 80%;
  display: flex;
  align-items: center;
  gap: 400px;
}

/* Logo Icon */
.logoicon {
  width: 100%; /* Ensure the image fills the container */
  height: auto;
}

/* Share Icon */
.scribble-icon {
  width: 40px;
  height: 40px;
}

/* Modal Content (Keep it Centered, Non-Scrollable) */
.modal-content {
  background: white;
  width: 50%;
  padding: 25px;
  gap: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;
  position: relative;
  display: flex;
  flex-direction: column;
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
  justify-content: space-around; /* Distribute items evenly */
  align-items: center; /* Align vertically */
  gap: 20px; /* Add spacing between elements */
  flex-wrap: wrap; /* Ensure it wraps properly if needed */
  width: 100%;
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
  padding-bottom: 20px;
  border-bottom: 1px solid black;
}

.description-section:last-child {
  border-bottom: none; /* Removes the bottom border from the last description-section */
}

.description-section h4 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.description-section p {
  font-size: 14px;
  color: #444;
}

/* Signature Section */
.signature-section {
  margin-top: 20px;
  font-style: italic;

  p {
    font-weight: bold;
  }
}

/* Actions */
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}

.gap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.img-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.signature-preview {
  width: 25%;
}

.barcode {
  margin-top: 10px;
  width: 170px;
  height: 55px;
}

.qrcode {
  height: 90px;
  width: 90px;
  margin-bottom: 60px; /* Add spacing below if needed */
  align-self: flex-start; /* Ensure it stays at the top */
}

.stains-container {
  display: flex;
  align-items: center; /* Align items vertically */
  gap: 20px; /* Space between image and text */
}

.stains-image {
  width: 350px;
  max-height: 400px;
}
.stains-content {
  margin-left: 30px;
}

.stains-image img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.stains-content ul {
  /* Remove default bullet points */
  padding: 0;
}

.stains-content li {
  line-height: 40px;
  font-size: 16px;
  margin-bottom: 5px;
}

.stains-content li strong {
  color: #000;
}
</style>
