<template>
  <div class="allcontainer">
    <!-- Header -->
    <div class="header-container">
      <!-- Left Section: Case ID & Status -->
      <div class="left-section">
        <img src="@/assets/pathogen/back.png" alt="logo" class="app-logo" />
        <div class="divider" />
        <span class="case-id">T1211210-EU</span>
        <span class="status">In preparation · Lung</span>
        <div class="divider" />
        <div class="slide-selector">
          <span class="slide-text">Slide 1 of 5</span>
          <div class="custom-dropdown">
            <select class="slide-dropdown">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <img src="@/assets/pathogen/dropdown.png" class="dropdown-arrow" />
          </div>
        </div>
        <div class="divider" />
        <!-- Middle Section: Patient Information -->
        <span class="case-id">9876277101</span>

        <div class="button-group">
          <button class="review-button">
            <img src="@/assets/pathogen/check.png" alt="Check Icon" class="button-icon" />
            Complete Review
          </button>
          <button class="save-button">Save</button>
        </div>
      </div>

      <!-- Right Section: Logo & Settings -->
      <div class="right-section">
        <div class="device-status">
          <span class="dot">•</span>
          <span class="case-id">Device Connected</span>
        </div>
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

    <!-- Main Content -->
    <div class="main-container">
      <div class="editor">
        <Sidebar
          :brightness="brightness"
          :contrast="contrast"
          :gamma="gamma"
          @item-selected="handleSidebarSelection"
          @update-brightness="
            val => {
              brightness = val
              updateFilter()
            }
          "
          @update-contrast="
            val => {
              contrast = val
              updateFilter()
            }
          "
          @update-gamma="
            val => {
              gamma = val
              updateFilter()
            }
          "
          @update-red="
            val => {
              red = val
              updateRGB()
            }
          "
          @update-green="
            val => {
              green = val
              updateRGB()
            }
          "
          @update-blue="
            val => {
              blue = val
              updateRGB()
            }
          "
        />

        <div class="sections">
          <div v-for="(slideId, index) in selectedSlideIds" :key="index" class="slide-section">
            <div class="topsection">
              <div class="rounded-label">{{ slideId }}</div>
              <div class="right-panel">
                <div
                  v-for="(item, itemIndex) in menuItems"
                  :key="itemIndex"
                  class="dropdown-box"
                  @click="toggleDropdown(slideId, itemIndex)"
                >
                  <div class="header">
                    <div class="icon-text">
                      <img :src="item.icon" :alt="item.label" />
                      <span>{{ item.label }}</span>
                    </div>
                    <span :class="['dropdown-arrow', { open: dropdownStates[slideId]?.[itemIndex] }]">▼</span>
                  </div>

                  <!-- Patient Details Dropdown -->
                  <div
                    v-if="item.type === 'patient'"
                    :class="['dropdown-content', { show: dropdownStates[slideId]?.[itemIndex] }]"
                  >
                    <div class="patient-info">
                      <div class="row">
                        <div class="info-row">
                          <span class="info-label">Patient Name:</span> {{ item.details.name }}
                        </div>
                        <div class="info-row"><span class="info-label">Patient ID:</span> {{ slideId }}</div>
                      </div>
                    </div>

                    <div class="divider" />

                    <div class="patient-info">
                      <div class="info-row">
                        <span class="info-label2">Specimen Type:</span> {{ item.details.specimen }}
                      </div>
                      <div class="info-row">
                        <span class="info-label2">Site of Collection:</span> {{ item.details.collectionSite }}
                      </div>
                      <div class="info-row">
                        <span class="info-label2">Clinical Data:</span> {{ item.details.clinicalData }}
                      </div>
                    </div>
                  </div>

                  <!-- Other Dropdown Items -->
                  <div v-else :class="['dropdown-content', { show: dropdownStates[slideId]?.[itemIndex] }]">
                    <p>Dropdown Content for {{ item.label }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="midsection">
              <div class="slide-container">
                <!-- Left Side QR Section -->
                <div class="qr-section">
                  <img src="@/assets/pathogen/qrcode.png" alt="QR Code" class="qr-code" />
                  <div class="divider" />
                  <span class="vertical-text">{{ slideId }}</span>
                </div>

                <!-- Right Side Image Section -->
                <div class="image-section" @click="gobig">
                  <img :src="getImageForSlide(slideId)" alt="Sample Slide" class="slide-image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="annotate">
        <div class="annotation-container">
          <div v-for="(item, index) in annotations" :key="index" class="annotation-card">
            <div class="review-label">FOR REVIEW</div>
            <img :src="item.image" :alt="item.label" class="annotation-image" />
            <div class="annotation-text">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import patientIcon from '@/assets/pathogen/rightpanel/person.png'
import aiIcon from '@/assets/pathogen/rightpanel/star.png'
import microscopeIcon from '@/assets/pathogen/rightpanel/circlesetting.png'
import diagnosticIcon from '@/assets/pathogen/rightpanel/setting.png'
import back1 from '@/assets/pathogen/9876277101.png'
import back2 from '@/assets/pathogen/9876277102.png'
import anno1 from '@/assets/pathogen/anno1.png'
import anno2 from '@/assets/pathogen/anno2.png'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import Sidebar from '@/components/sidebar/index.vue'

const selectedSlideIds = ref([])

onMounted(() => {
  if (route.query.slides) {
    selectedSlideIds.value = route.query.slides.split(',')
  }
  initializeDropdownStates()
})

// Function to return image path dynamically based on slide ID
const getImageForSlide = (slideId: string) => {
  if (slideId === '9876277101') {
    return back1
  } else if (slideId === '9876277102') {
    return back2
  } else {
    return back1 // Default fallback image
  }
}

const gobig = () => {
  // Convert array of IDs to a comma-separated string
  router.push({
    path: '/bigview'
  })
}

const menuItems = ref([
  {
    label: 'Patient Detail',
    icon: patientIcon,
    open: false,
    type: 'patient',
    details: {
      name: 'Cedar Pete',
      patientID: 'P-9890200',
      dob: '24 Nov, 1990',
      age: '34yo',
      gender: 'Male',
      specimen: 'Skin biopsy',
      collectionSite: 'Left forearm',
      clinicalData: 'Nodular BCC, 173.51'
    }
  },
  { label: 'AI Insights', icon: aiIcon, open: false },
  { label: 'Microscope Control', icon: microscopeIcon, open: false },
  { label: 'Diagnostic', icon: diagnosticIcon, open: false }
])

const annotations = [
  { image: anno1, label: 'Annotate #1' },
  { image: anno2, label: 'Annotate #2' }
]

const dropdownStates = ref<{ [key: string]: boolean[] }>({})

// Function to initialize dropdown states for each slide
const initializeDropdownStates = () => {
  selectedSlideIds.value.forEach(slideId => {
    if (!dropdownStates.value[slideId]) {
      dropdownStates.value[slideId] = menuItems.value.map(() => false)
    }
  })
}

// Function to toggle dropdown for a specific slide
const toggleDropdown = (slideId: string, index: number) => {
  if (dropdownStates.value[slideId]) {
    dropdownStates.value[slideId][index] = !dropdownStates.value[slideId][index]
  }
}

const route = useRoute()
const router = useRouter()
</script>

<style scoped lang="scss">
/* Adjust main content so it doesn't overlap with the sidebar */
.allcontainer {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header styling */
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

    /* Slide Selector */
    .slide-selector {
      display: flex;
      align-items: center;
      gap: 8px;
      color: white;
    }

    .slide-text {
      font-size: 16px;
    }

    /* Custom Dropdown Wrapper */
    .custom-dropdown {
      position: relative;
      display: flex;
      align-items: center;
      background: #0e214f; /* Dark blue background */
      padding: 5px 10px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.5);
    }

    /* Hide default select dropdown */
    .slide-dropdown {
      appearance: none;
      background: transparent;
      border: none;
      color: white;
      font-size: 16px;
      padding-right: 30px;
      cursor: pointer;
      outline: none;
      width: 40px; /* Adjust width for number */
      text-align: center;
    }

    /* Custom dropdown arrow */
    .dropdown-arrow {
      position: absolute;
      right: 8px;
      width: 14px;
      height: 14px;
      pointer-events: none; /* Prevent interaction */
    }

    .slide-dropdown option {
      background: #0e214f;
      color: white;
    }
    .button-group {
      display: flex;
      gap: 10px;
      margin-left: 20px;
    }

    .review-button,
    .save-button {
      border: none;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 6px;
      padding: 5px 17px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .review-button {
      background: #61a6ff;
      color: white;
      display: flex;
      gap: 8px;
    }

    .save-button {
      background: #61a6ff;
      color: white;
    }

    .review-button:hover,
    .save-button:hover {
      background: #4a90e2;
    }

    .button-icon {
      width: 18px;
      height: 18px;
    }
  }
  .right-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    gap: 20px;

    .settings-icon {
      margin-right: 10px;
    }
    .device-status {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
    }
    .dot {
      margin-right: 5px;
      margin-bottom: 7px;
      font-size: 40px;
      align-items: center;
      color: #06ffb8;
    }
  }
  .divider {
    width: 1px;
    height: 49px;
    background: rgba(221, 221, 221, 0.4); /* Lower opacity only for the background */
  }
}

/* Main container layout */
.main-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  padding: 30px;
}

.editor {
  display: flex;
  flex-direction: row;
  max-height: 670px;
  width: 100%;
}

.leftside {
}

// SIDEBAR
.sidebar {
  // Moves it away from the header
  height: fit-content;
  width: 80px;
  background-color: #2c3553;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  margin-right: 80px;

  .sidebar-item {
    width: 100%;
    text-align: center;
    color: white;
    font-size: 12px;
    padding: 15px 0;
    cursor: pointer;
    display: flex;
    flex-direction: column; // Keeps image and text stacked
    align-items: center;
    transition: background 0.3s ease-in-out;
    position: relative;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    img {
      width: 24px;
      height: 24px;
    }

    span {
      display: block;
      text-align: center;
      line-height: 14px;
      margin-top: 5px;
    }

    &.dropdown {
      .icon-container::after {
        content: '▼'; // Unicode for dropdown arrow
        font-size: 10px;
        margin-left: 5px;
        color: white;
      }
    }
  }

  .divider {
    width: 60%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.3);
    margin: 10px 0;
  }
}

.right-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1000;

  .dropdown-box {
    background-color: #2c3553;
    color: white;
    font-size: 14px;
    padding: 15px;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }

    .icon-text {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    img {
      width: 20px;
      height: 20px;
    }

    .dropdown-arrow {
      font-size: 12px;
      transition: transform 0.3s ease-in-out;
    }

    .open {
      transform: rotate(180deg);
    }
    .info-label {
      color: gray;
      font-family: Figtree;
      font-size: 16px;
    }

    .dropdown-content {
      height: 0;
      overflow: hidden;
      transform: scaleY(0);
      transform-origin: top;
      transition:
        transform 0.3s ease-in-out,
        opacity 0.3s ease-in-out;
      opacity: 0;

      &.show {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
        margin-top: 10px;
      }
    }
  }
}

.patient-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: white;

  .row {
    display: flex;
    gap: 50px;
  }

  .info-row {
    display: flex;
    flex-direction: column; // Ensures label and value are on different lines
    font-size: 15px;
    font-weight: 500;
    padding: 6px 0;

    .info-label {
      font-weight: 600;
      color: #a9b1c9;
      display: block; // Forces label to be on its own line
      margin-bottom: 2px;
    }

    .age {
      font-size: 13px;
      color: #a9b1c9;
    }
  }
}

/* Ensure it applies to all patient sections */
.right-panel .patient-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-label2 {
  font-weight: bold;
  color: white;
  display: block; // Forces label to be on its own line
  margin-bottom: 2px;
  font-size: 16px;
}

.divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 15px 0;
}

.sections {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
}
.slide-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 250px;
}

.topsection {
  position: relative; // Ensures the right panel is positioned within the top section
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.midsection {
  display: flex;
  flex-direction: column;
  gap: 200px;
  width: 100%;
}
.rounded-label {
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  color: #000; // Adjust if needed
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 16px; // Ensures rounded corners
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); // Optional subtle shadow
  text-align: center;
  white-space: nowrap;
  width: fit-content;
  height: fit-content;
}

.slide-container {
  display: flex;
  width: 80%;
  max-width: 900px;
  height: 250px;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-left: 50px;
}

/* QR Section */
.qr-section {
  width: 100px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-right: 1px solid #ddd;
  padding: 10px;
}

.qr-code {
  width: 60px;
  height: 60px;
}

.divider {
  width: 80%;
  height: 1px;
  background: #ddd;
  margin: 10px 0;
}

.vertical-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 16px;
  font-weight: bold;
  color: black;
}

/* Image Section */
.image-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.annotation-container {
  margin-top: 10px;
  display: flex;
  gap: 20px;
  justify-content: left;
  align-items: center;

  .annotation-card {
    width: 200px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    text-align: center;
    position: relative;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }

    .review-label {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: white;
      color: #1f3bb5;
      font-weight: bold;
      padding: 4px 8px;
      font-size: 12px;
      border-radius: 8px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .annotation-image {
      width: 100%;
      height: 120px;
      object-fit: cover;
      border-radius: 8px;
    }

    .annotation-text {
      font-size: 14px;
      font-weight: bold;
    }
  }
}

.row {
  display: flex;
  flex-direction: row;
}

.divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 15px 0;
}
</style>
