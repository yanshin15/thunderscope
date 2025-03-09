<template>
  <div class="allcontainer" :class="{ 'with-sidebar': selectedSlides.length > 0 }">
    <div class="header-container">
      <!-- Left Section: Case ID & Status -->
      <div class="left-section">
        <img src="@/assets/pathogen/back.png" alt="logo" class="app-logo" />
        <div class="divider" />
        <span class="case-id">T1211210-EU</span>
        <span class="status">In preparation · Lung</span>
        <span class="case-count">5</span>
        <div class="divider" />
        <!-- Middle Section: Patient Information -->
        <span class="patient-name">Cedar Pete</span>
        <span>•</span>
        <span class="patient-id">P-9890200</span>
        <span>•</span>
        <span class="gender">Male</span>
        <span>•</span>
        <span class="dob">24 Nov, 1990 (34yo)</span>
      </div>

      <!-- Right Section: Logo & Settings -->
      <div class="right-section">
        <img src="@/assets/menu/logo.png" alt="logo" class="app-logo" />
        <div class="divider" />
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img src="@/assets/menu/setting.png" alt="settings" class="settings-icon" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goPersonal">Profile</el-dropdown-item>
              <el-dropdown-item @click="logout">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="slide-test-container">
      <div class="divide">
        <div class="cases-header">
          <div class="cases-title">
            <h2 class="case-id">T12121100</h2>
          </div>
          <div class="review">FOR REVIEW • LUNG</div>
        </div>
      </div>
      <!-- Patient Info Header -->
      <div class="patient-info-container">
        <div class="patient-details">
          <img src="@/assets/slides/person1.png" alt="Avatar" class="patient-avatar" />
          <div>
            <p class="patient-id">P-98920202</p>
            <h2 class="patient-name">Cedar Pete</h2>
          </div>
        </div>

        <div class="patient-meta">
          <div class="info-block">
            <p class="label">Phone Number</p>
            <p class="value">087782326612</p>
          </div>
          <div class="divider" />
          <div class="info-block">
            <p class="label">Birthdate</p>
            <p class="value">26 May 1990</p>
          </div>
          <div class="divider" />
          <div class="info-block">
            <p class="label">Gender</p>
            <p class="value">Male</p>
          </div>
          <div class="divider" />
          <div class="info-block">
            <p class="label">Age</p>
            <p class="value">34</p>
          </div>
        </div>

        <div class="pathologist-info">
          <div class="doctor-avatar">LK</div>
          <div>
            <p class="doctor-name">Dr. Lee K.</p>
            <p class="last-update">Last update 10 Nov, 10:00</p>
          </div>
        </div>
      </div>

      <div class="main-container" :class="{ 'with-sidebar': selectedSlide !== null }">
        <div class="slide-test-container">
          <div class="slides-header">
            <h3>Slides (7)</h3>

            <div class="slides-actions">
              <!-- Selection Status -->
              <div v-if="selectedSlides.length > 0" class="selected-info">
                {{ selectedSlides.length }} Slides Selected
                <button class="viewer-btn" @click="tonewdevice()">
                  <img src="@/assets/viewer-icon.png" alt="Eye Icon" class="viewer-icon" />
                  Open in viewer
                </button>
              </div>

              <!-- Add Slide Button -->
              <div v-else>
                <button class="viewer-btn">
                  <img src="@/assets/slides/plus.png" alt="Add Slide" class="add-icon" />
                  Add Slide Test
                </button>
              </div>
            </div>
          </div>
          <div class="slides-grid">
            <div v-for="(slide, index) in slides" :key="index" class="slide-card">
              <div class="slide-header">
                <p class="slide-id">{{ slide.id }}</p>
                <label class="checkbox-container">
                  <input type="checkbox" :checked="slide.selected" @change="toggleSelect(index, slide)" />
                  <span class="checkmark" />
                </label>
              </div>

              <div class="slide-image">
                <span class="status-badge" :class="slide.status.toLowerCase().replace(' ', '-')">
                  {{ slide.status }}
                </span>
                <img :src="slide.image" alt="Slide Image" />
              </div>

              <div class="slide-footer">
                <img src="@/assets/slides/qrcode.png" alt="QR Code" class="qr-code" />
                <p class="slide-code">{{ slide.code }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar for Slide Details -->
      <!-- Sidebar for Slide Details -->
      <div class="slide-sidebar" :class="{ open: selectedSlides.length > 0 }">
        <div class="sidebar-content">
          <div class="sidebar-header">
            <button class="close-btn" @click="closeSidebar">X</button>
            <h3 class="sidebar-title">Slide Detail</h3>
          </div>

          <div class="slide-tabs">
            <span
              v-for="(slide, index) in selectedSlides"
              :key="slide.id"
              :class="{ active: index === currentSlideIndex }"
              @click="currentSlideIndex = index"
            >
              {{ slide.id }}
            </span>
          </div>

          <!-- Slide Details -->
          <h2 class="sidebar-title">{{ currentSlide?.id }}</h2>
          <p class="sidebar-status">{{ currentSlide?.status }}</p>

          <h3 class="sidebar-section-title">Image and Documents ({{ currentSlide?.documents?.length || 0 }})</h3>
          <div class="documents-container">
            <div v-if="currentSlide?.documents?.length > 0" class="documents-grid">
              <div v-for="doc in currentSlide.documents" :key="doc.name" class="document-card">
                <div class="image-wrapper">
                  <img v-if="doc.image" :src="doc.image" alt="Document Preview" class="full-background" />
                  <span class="doc-status">{{ doc.status }}</span>
                </div>
                <p class="doc-name">{{ doc.name }}</p>
                <p class="doc-date">{{ doc.date }}</p>
                <button class="export-btn" @click="openExportPopup(doc)">Export</button>
              </div>
              <div v-if="showPopup" class="popup-overlay">
                <div class="popup-container">
                  <button class="close-btn" @click="closeExportPopup">✖</button>
                  <h3>Export {{ selectedDoc?.name }}</h3>
                  <p class="popuptitle">File Formats</p>

                  <div class="format-options">
                    <label> <input v-model="selectedFormat" type="radio" value="JPG" /> JPG </label>
                    <label> <input v-model="selectedFormat" type="radio" value="PNG" /> PNG </label>
                    <label> <input v-model="selectedFormat" type="radio" value="TIFF" /> TIFF </label>
                  </div>

                  <div class="popup-buttons">
                    <button @click="exportFile">Apply</button>
                    <button @click="closeExportPopup">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="no-documents">No documents available.</div>
          </div>

          <h3 class="sidebar-section-title">Right Eye (OD):</h3>
          <p class="sidebar-description">{{ currentSlide?.diagnostic }}</p>

          <h3 class="sidebar-section-title">Left Eye (OS):</h3>
          <p class="sidebar-description">{{ currentSlide?.microscopicDescription }}</p>

          <div class="last-reviewed">
            <p class="review-label">Last review by:</p>
            <p class="reviewer-name">{{ currentSlide?.lastReviewedBy?.name }}</p>
            <p class="reviewer-title">{{ currentSlide?.lastReviewedBy?.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { defineProps } from 'vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

defineProps({
  slide: {
    type: Object,
    required: true
  }
})

const tonewdevice = () => {
  if (selectedSlides.value.length === 0) {
    return // Do nothing if no slides are selected
  }

  // Extract only the slide IDs
  const selectedIds = selectedSlides.value.map(slide => slide.id)
  console.log('These are the seleceted ids', selectedIds)

  // Route to new device viewer with selected IDs as query parameters
  router.push({
    path: '/newdevice',
    query: { slides: selectedIds.join(',') } // Convert array to a comma-separated string
  })
}
const showPopup = ref(false)
const selectedDoc = ref(null)
const selectedFormat = ref('JPG') // Default format
const popupPosition = ref({ top: '0px', left: '0px' })

const openExportPopup = (doc, event) => {
  selectedDoc.value = doc
  showPopup.value = true

  // Ensure DOM updates before calculating position
  nextTick(() => {
    const buttonRect = event.target.getBoundingClientRect()
    popupPosition.value = {
      top: `${buttonRect.top + window.scrollY}px`,
      left: `${buttonRect.left + buttonRect.width + 10}px` // 10px spacing
    }
  })
}

const closeExportPopup = () => {
  showPopup.value = false
  selectedDoc.value = null
}

const exportFile = () => {
  alert(`Exporting ${selectedDoc.value.name} as ${selectedFormat.value}`)
  closeExportPopup()
}

// Store the selected slide
const selectedSlide = ref(null)

// Toggle sidebar when clicking a slide

const toggleSelect = (index, slide) => {
  // Ensure Vue tracks changes properly
  slides.value[index].selected = !slides.value[index].selected

  if (slides.value[index].selected) {
    selectedSlides.value.push(slide)
  } else {
    selectedSlides.value = selectedSlides.value.filter(s => s.id !== slide.id)
  }
}

// Computed property to get the currently active slide in the sidebar
const currentSlide = computed(() => {
  return selectedSlides.value[currentSlideIndex.value] || null
})

// Close sidebar
const closeSidebar = () => {
  selectedSlide.value = null
  selectedSlides.value = [] // Empty selected slides list

  // Reset all slides to unselected
  slides.value.forEach(slide => {
    slide.selected = false
  })
}
watch(selectedSlide, newVal => {
  console.log('Sidebar state changed: ', newVal)
})
const slides = ref([
  {
    id: '9876277101',
    image: new URL('@/assets/eye/panel3.png', import.meta.url).href,
    status: 'FOR REVIEW',
    code: '91211002',
    selected: false,
    documents: [
      {
        name: 'Anotate 1',
        date: '13 May, 2024',
        status: 'FOR REVIEW',
        image: new URL('@/assets/eye/anno1.png', import.meta.url).href
      },
      {
        name: 'Anotate 2',
        date: '13 May, 2024',
        status: 'FOR REVIEW',
        image: new URL('@/assets/eye/anno2.png', import.meta.url).href
      },
      {
        name: 'Anotate 3',
        date: '13 May, 2024',
        status: 'FOR REVIEW',
        image: new URL('@/assets/eye/anno3.png', import.meta.url).href
      },
      {
        name: 'Anotate 4',
        date: '13 May, 2024',
        status: 'FOR REVIEW',
        image: new URL('@/assets/eye/anno4.png', import.meta.url).href
      },
      {
        name: 'Anotate 5',
        date: '13 May, 2024',
        status: 'FOR REVIEW',
        image: new URL('@/assets/eye/anno3.png', import.meta.url).href
      }
    ],
    diagnostic:
      'Invasive squamous cell carcinoma, moderately differentiated, involving the dermis. Margins are free of tumor.',
    microscopicDescription:
      'The epidermis shows irregular acanthosis with focal areas of hyperkeratosis and parakeratosis. The dermo-epidermal junction is intact.',
    lastReviewedBy: {
      name: 'Dr. Richardson, M.B.Bs',
      title: 'MD Pathologist'
    }
  },
  {
    id: '9876277102',
    image: new URL('@/assets/eye/bigpanel2.png', import.meta.url).href,
    status: 'FOR REVIEW',
    code: '91211002',
    selected: false,
    documents: [
      { name: 'Anotate 1', date: '13 May, 2024', status: 'FOR REVIEW' },
      { name: 'Anotate 2', date: '13 May, 2024', status: 'FOR REVIEW' },
      { name: 'Anotate 3', date: '13 May, 2024', status: 'FOR REVIEW' },
      { name: 'Anotate 4', date: '13 May, 2024', status: 'FOR REVIEW' },
      { name: 'Anotate 5', date: '13 May, 2024', status: 'FOR REVIEW' }
    ],
    diagnostic:
      'Optic Nerve:  Disc appears round with a clear margin.  Cup-to-disc ratio within normal limits.  No evidence of pallor or edema.',
    microscopicDescription:
      'Optic Nerve: Disc appears round with a clear margin. Cup-to-disc ratio slightly increased compared to previous exam, but still within borderline normal limits.  No evidence of pallor or edema.',
    lastReviewedBy: {
      name: 'Dr. Jane Smith, MD',
      title: 'Physician'
    }
  },
  {
    id: '9876277103',
    image: new URL('@/assets/eye/bigpanel1.png', import.meta.url).href,
    status: 'FOR REVIEW',
    code: '91211002',
    selected: false
  },
  {
    id: '9876277104',
    image: new URL('@/assets/eye/panel4.png', import.meta.url).href,
    status: 'COMPLETED',
    code: '91211002',
    selected: false
  },
  {
    id: '9876277105',
    image: new URL('@/assets/eye/panel5.png', import.meta.url).href,
    status: 'COMPLETED',
    code: '91211002',
    selected: false
  },
  {
    id: '9876277106',
    image: new URL('@/assets/eye/panel6.png', import.meta.url).href,
    status: 'FOR REVIEW',
    code: '91211002',
    selected: false
  },
  {
    id: '9876277107',
    image: new URL('@/assets/eye/panel6.png', import.meta.url).href,
    status: 'FOR REVIEW',
    code: '91211002',
    selected: false
  }
])

const selectedSlides = ref([]) // Store multiple selected slides
const currentSlideIndex = ref(0) // Track the currently displayed slide index
</script>

<style scoped lang="scss">
.allcontainer {
  width: 100vw;
  height: 100vh;
  transition: width 0.3s ease-in-out;
}

.allcontainer.with-sidebar {
  width: 70vw !important;
}

.header-container {
  width: 100vw;
  height: 50px;
  background: linear-gradient(to right, #0e214f, #1f4cb5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 1000;
  color: white;

  .left-section {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    span {
      font-weight: lighter;
      font-size: 14px;
    }
    .patient-name {
      color: white;
    }
    .case-id {
      font-weight: bold;
    }
    .case-count {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px; /* Adjust size as needed */
      height: 35px;
      background: #1249bd; /* Dark blue background */
      color: white; /* White text */
      font-size: 14px; /* Adjust size as needed */
      font-weight: bold;
      border-radius: 3px; /* Slightly rounded corners */
    }
  }
  .right-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    .settings-icon {
      margin-right: 10px;
    }
  }
  .divider {
    width: 1px;
    height: 49px;
    background: rgba(221, 221, 221, 0.4); /* Lower opacity only for the background */
  }
}

.el-dropdown {
  color: white;
}

.review {
  font-size: 14px;
  font-weight: bold;
  color: #0043e6;
  background: #e8f1ff;
  padding: 5px 12px;
  border-radius: 12px;
  display: inline-block;
}

.slide-test-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.patient-info-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 20px;
  border-bottom: 1px solid #ddd;
  background: white;
}

.patient-details {
  display: flex;
  align-items: center;
  gap: 10px;
}

.patient-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.patient-name {
  font-size: 18px;
  font-weight: bold;
  color: #000;
}

.patient-meta {
  display: flex;
  align-items: center;
  gap: 15px;
}

.cases-header {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.info-block {
  text-align: center;
}

.pathologist-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.doctor-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2ec8d3;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
}

.slides-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
}

.selected-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: black;
}

.viewer-btn {
  background: #204cb5;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.viewer-icon {
  width: 16px;
  height: 16px;
}

.slides-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}

.slide-card {
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  font-weight: bold;
}

/* Checkbox Container */
.checkbox-container {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: 16px;
}

/* Hide default checkbox */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Custom checkbox style */
.checkmark {
  width: 20px;
  height: 20px;
  background-color: white;
  border: 2px solid #2196f3;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Show checkmark when checked */
.checkbox-container input:checked + .checkmark::after {
  content: '✔';
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.checkbox-container input:checked + .checkmark {
  background-color: #2196f3;
  border-color: #2196f3;
}

.slide-image {
  position: relative;
  width: 100%;
}

.slide-image img {
  width: 100%;
  border-radius: 6px;
}

.status-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(255, 255, 255, 0.8);
  color: #0066ff;
  font-size: 12px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 12px;
}

.slide-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

.qr-code {
  width: 20px;
  height: 20px;
}

.main-container {
  transition: margin-right 0.3s ease-in-out;
  width: 100%;
}

.main-container.with-sidebar {
  margin-right: 350px; /* Moves content left when sidebar appears */
}

.slide-sidebar {
  position: fixed;
  top: 0;
  right: -500px; /* Hidden initially */
  width: 500px;
  height: 100%;
  background: white;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease-in-out;
  z-index: 1050;
  overflow-y: auto;
  padding: 20px;
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.nav-buttons button {
  background-color: #204cb5;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.nav-buttons button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.slide-sidebar.open {
  right: 0; /* Pushes in when open */
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar-title {
  font-size: 22px;
  font-weight: bold;
}

.sidebar-status {
  background: #e8f1ff;
  color: #0066ff;
  padding: 6px 12px;
  border-radius: 12px;
  display: inline-block;
  font-size: 14px;
}

.sidebar-description {
  font-size: 14px;
  color: #444;
  margin-top: 5px;
}

.sidebar-section-title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
}

.documents-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.document-card {
  position: relative;
  width: auto; /* Adjust based on design */
  height: auto;
  background: #f8f9fc;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 140px; /* Adjust height to fit design */
}

.full-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures image scales without distortion */ /* Moves the image behind other elements */
}

.doc-status {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.8);
  color: #0066ff;
  font-size: 12px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 12px;
  z-index: 1;
}

.doc-name,
.doc-date {
  margin-top: 10px;
  font-size: 14px;
}

.export-btn {
  background: none;
  border: none;
  color: #0066ff;
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 5px;
}

.doc-date {
  font-size: 12px;
  color: gray;
}

.last-reviewed {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

.review-label {
  font-size: 12px;
  color: gray;
}

.reviewer-name {
  font-size: 14px;
  font-weight: bold;
}

.reviewer-title {
  font-size: 12px;
  color: gray;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-right: 10px;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
}

.slide-tabs {
  display: flex;
  gap: 15px;
  padding: 10px 15px;
  border-bottom: 2px solid #ddd;
}

.slide-tabs span {
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: #888;
  padding: 5px;
}

.slide-tabs span.active {
  color: black;
  font-weight: bold;
  border-bottom: 3px solid #3f51b5;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px; /* Space between X and title */
  padding: 10px 15px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
}

.sidebar-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.doc-image {
  width: 100%;
  height: auto;
  margin-bottom: 8px;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.popup-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.popup-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.popup-buttons button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.popup-buttons button:first-child {
  background: #0066ff;
  color: white;
}

.popup-buttons button:last-child {
  background: #ccc;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.format-options {
  display: flex;
  flex-direction: column; /* Ensures radio buttons are in a column */
  gap: 8px;
  text-align: left;
}

.popuptitle {
  text-align: left;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 5px;
}
</style>
