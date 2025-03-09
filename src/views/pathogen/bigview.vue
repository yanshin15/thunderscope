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
          <button class="review-button" @click="showReview = true">
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
      <div ref="viewerContainer" class="openseadragon-viewer" />
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
              <div class="right-panel">
                <div
                  v-for="(item, itemIndex) in menuItems"
                  :key="itemIndex"
                  class="dropdown-box"
                  @click="toggleDropdown(slideId, itemIndex)"
                >
                  <div class="header" @click="toggleDropdown(slideId, itemIndex)">
                    <div class="icon-text">
                      <img :src="item.icon" :alt="item.label" />
                      <span>{{ item.label }}</span>
                    </div>
                    <span
                      :class="['dropdown-arrow', { open: dropdownStates[slideId]?.[itemIndex] }]"
                      @click.stop="closeDropdown(slideId, itemIndex)"
                    >
                      ▼
                    </span>
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
                    <div class="patient-info">
                      <div class="row">
                        <div class="info-row">
                          <span class="info-label">Date of Birth:</span> {{ item.details.dob }}
                        </div>
                        <div class="info-row"><span class="info-label">Gender:</span> {{ item.details.gender }}</div>
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
                  <div
                    v-else-if="item.type === 'Microscope Control'"
                    :class="['dropdown-content', { show: dropdownStates[slideId]?.[itemIndex] }]"
                  >
                    <div class="microscope-control">
                      <h3>Microscope Control</h3>

                      <!-- Sample Image -->
                      <div class="osdcontainer">
                        <div id="hehe" ref="navigatorDiv" class="osd-navigator" />
                      </div>
                      <!-- Custom Navigator -->
                      <!-- Navigator Div -->

                      <!-- XYZ Position -->
                      <h4>XYZ Position</h4>
                      <div class="xyz-section">
                        <div class="controlcol">
                          <div class="flexrow">
                            <label for="step-select">XY</label>
                            <div class="xyz-controls">
                              <button class="arrow up" @click="moveViewport('up')">▲</button>
                              <div class="middle-buttons">
                                <button class="arrow left" @click="moveViewport('left')">◀</button>
                                <button class="arrow right" @click="moveViewport('right')">▶</button>
                              </div>
                              <button class="arrow down" @click="moveViewport('down')">▼</button>
                            </div>
                          </div>
                          <div class="flexrow">
                            <label for="step-select">Step</label>
                            <div class="xyz-dropdown">
                              <select id="step-select" v-model="selectedStep">
                                <option value="Full">Full</option>
                                <option value="Half">Half</option>
                                <option value="Quarter">Quarter</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div>
                          <!-- Post Test Review Modal -->
                          <PostTestReview
                            :is-visible="showReview"
                            @submit="handleReviewSubmit"
                            @close="showReview = false"
                          />

                          <!-- Complete Review Modal -->
                          <CompleteReviewModal
                            :is-visible="isReviewVisible"
                            :signature="reviewSignature"
                            @close="isReviewVisible = false"
                          />
                        </div>

                        <div class="xyz-container">
                          <!-- Axis Selector -->
                          <div class="xyz-dropdown">
                            <select v-model="selectedAxis">
                              <option value="X">X</option>
                              <option value="Y">Y</option>
                              <option value="Z">Z</option>
                            </select>
                          </div>

                          <!-- Measurement Display -->
                          <div class="xyz-value">
                            <span>0.2666 mm²</span>
                          </div>
                          <div class="flexrow">
                            <label for="step-select">Step</label>
                            <div class="xyz-dropdown">
                              <select id="step-select" v-model="selectedStep">
                                <option value="Full">Full</option>
                                <option value="Half">Half</option>
                                <option value="Quarter">Quarter</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Magnification Slider -->
                      <div class="slider-container">
                        <div class="slider-wrapper">
                          <h4>Magnification</h4>
                          <input
                            v-model="magnification"
                            type="range"
                            min="0.5"
                            max="10"
                            step="0.1"
                            @input="updateMagnification"
                          />
                          <div class="slider-labels">
                            <span>0.5</span>
                            <span>5.25</span>
                            <span>10</span>
                          </div>
                        </div>
                      </div>

                      <!-- Color Adjustment -->
                      <div class="color-adjustment">
                        <h4>Color Adjustment</h4>
                        <div class="flexrow">
                          <button
                            class="color-btn"
                            :class="{ active: selectedColor === 'Low' }"
                            @click="selectColor('Low')"
                          >
                            Low
                          </button>
                          <button
                            class="color-btn"
                            :class="{ active: selectedColor === 'Medium' }"
                            @click="selectColor('Medium')"
                          >
                            Medium
                          </button>
                          <button
                            class="color-btn"
                            :class="{ active: selectedColor === 'High' }"
                            @click="selectColor('High')"
                          >
                            High
                          </button>
                        </div>
                      </div>

                      <!-- Exposure & Aperture Sliders -->
                      <div class="slider-container">
                        <div class="slider-wrapper">
                          <h4>Exposure</h4>
                          <input v-model="exposure" type="range" min="-2" max="2" step="0.1" />
                          <div class="slider-labels">
                            <span>-2</span>
                            <span>0</span>
                            <span>2</span>
                          </div>
                        </div>
                      </div>

                      <div class="slider-container">
                        <div class="slider-wrapper">
                          <h4>Aperture</h4>
                          <input v-model="aperture" type="range" min="25" max="100" step="5" />
                          <div class="slider-labels">
                            <span>25</span>
                            <span>50</span>
                            <span>100</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else-if="item.type === 'AI Insights'"
                    :class="['dropdown-content', { show: dropdownStates[slideId]?.[itemIndex] }]"
                  >
                    <div class="ai-insights">
                      <h3>AI Insights</h3>

                      <div class="ai-section">
                        <h4>Microscopic Description</h4>
                        <p>
                          Right eye: Normal fundus examination. Left eye: Borderline cup-to-disc ratio. Possible drusen
                          noted in the superior temporal quadrant. Recommend follow-up examination in 6 months to
                          monitor for any changes
                        </p>
                      </div>

                      <div class="divider" />

                      <div class="ai-section">
                        <h4>Infectious Disease</h4>
                        <p>
                          The results of a fundus examination can help your doctor diagnose and monitor a variety of eye
                          conditions, such as:
                        </p>
                        <ul>
                          <li>Cataracts</li>
                          <li>Glaucoma</li>
                          <li>Macular degeneration</li>
                          <li>Diabetic retinopathy</li>
                          <li>Retinal detachment</li>
                        </ul>
                      </div>

                      <div class="divider" />
                    </div>
                  </div>
                  <!-- Diagnostic by AI Dropdown -->
                  <div
                    v-else-if="item.type === 'Diagnostic'"
                    :class="['dropdown-content', { show: dropdownStates[slideId]?.[itemIndex] }]"
                  >
                    <div class="diagnostic-container">
                      <h3>Diagnostic by AI</h3>
                      <p class="subtext">Need to edit this diagnostic before completed</p>

                      <textarea v-model="diagnosticText" class="diagnostic-textarea" />

                      <button class="edit-button">Edit</button>
                    </div>
                  </div>

                  <!-- Other Dropdown Items -->
                  <div v-else :class="['dropdown-content', { show: dropdownStates[slideId]?.[itemIndex] }]">
                    <p>Dropdown Content for {{ item.label }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Full Annotation Popup -->
      <div
        v-if="selectedAnnotation && !savedAnnotations[selectedAnnotation.id]"
        class="annotation-popup"
        :style="popupStyle"
      >
        <div class="popup-header">
          <span>Set Annotation</span>
          <button class="close-btn" @click="selectedAnnotation = null">×</button>
        </div>
        <div class="popup-body">
          <label>Label</label>
          <input v-model="selectedAnnotation.label" placeholder="Need Review" />
          <div class="popup-actions">
            <button class="btn" @click="saveAnnotation">Save</button>
            <button class="btn" @click="cancelAnnotation">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Small Label Box (Only for Saved Annotations) -->
      <!-- Small Label Box (Always Show for Saved Annotations) -->
      <div
        v-if="selectedAnnotation && savedAnnotations[selectedAnnotation.id]"
        class="annotation-label-box"
        :style="popupStyle"
      >
        <span class="label-text">Label</span>
        <span class="label-value">{{ savedAnnotations[selectedAnnotation.id].label }}</span>
      </div>
      <div class="annotate">
        <div class="annotation-container">
          <!-- <div id="hehe" ref="navigatorDiv" class="osd-navigator" /> -->
          <div
            id="hehe"
            ref="navigatorDiv"
            class="osd-navigator"
            :style="{ display: showNavigator ? 'block' : 'none' }"
          />
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
import { ref, onMounted, nextTick } from 'vue'
import patientIcon from '@/assets/pathogen/rightpanel/person.png'
import aiIcon from '@/assets/pathogen/rightpanel/star.png'
import microscopeIcon from '@/assets/pathogen/rightpanel/circlesetting.png'
import diagnosticIcon from '@/assets/pathogen/rightpanel/setting.png'
import anno1 from '@/assets/eye/eyeanno1.png'
import anno2 from '@/assets/eye/eyeanno2.png'
import bigBackImage from '/images/bigback.png'
import OpenSeadragon from 'openseadragon'
import Sidebar from '@/components/sidebar/index.vue'
import { createOSDAnnotator } from '@annotorious/openseadragon'
import '@annotorious/openseadragon/annotorious-openseadragon.css'
import PostTestReview from '@/components/postreview/index.vue'
// import Annotorious from '@recogito/annotorious-openseadragon'
import CompleteReviewModal from '@/components/postreview/CompleteReviewModal.vue'

const OpenSeadragonFiltering = ref<any>(null)

const showReview = ref(false)
const isReviewVisible = ref(false)
const reviewSignature = ref(null)

// Handle receiving the signature from PostTestReview
const handleReviewSubmit = signature => {
  reviewSignature.value = signature // Store signature image
  isReviewVisible.value = true // Open CompleteReviewModal
}

const navigatorDiv = ref<HTMLDivElement | null>(null)

const selectedColor = ref('Medium') // Default selected option
// const annotorious = ref<any | null>(null)
const annotator = ref<any | null>(null)

const selectColor = (color: string) => {
  selectedColor.value = color
}
const selectedStep = ref('Full')
const selectedAxis = ref('Z')
const magnification = ref(1.1)
const exposure = ref(0)
const aperture = ref(50)

const selectedSlideIds = ref(['9876277101'])

// Reference to OpenSeadragon container
const viewerContainer = ref<HTMLDivElement | null>(null)
const viewer = ref<OpenSeadragon.Viewer | null>(null)
const selectedAnnotation = ref<any | null>(null)
onMounted(async () => {
  await nextTick() // Ensure the DOM is fully rendered before initializing OpenSeadragon

  if (route.query.slides) {
    selectedSlideIds.value = route.query.slides.split(',')
  }
  initializeDropdownStates()

  if (!viewerContainer.value || !navigatorDiv.value) {
    console.error('Error: OpenSeadragon container or navigator not found!')
    return
  }

  console.log('Initializing OpenSeadragon...', viewerContainer.value, navigatorDiv.value)

  // Initialize OpenSeadragon with a navigator
  viewer.value = OpenSeadragon({
    element: viewerContainer.value,
    prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
    tileSources: {
      type: 'image',
      url: '/images/bigback2.png' // Ensure this path is accessible
    },
    showNavigator: true, // Enable navigator
    navigatorId: navigatorDiv.value.id, // Attach the navigator correctly
    showRotationControl: false,
    zoomPerScroll: 1.2,
    maxZoomLevel: 10,
    minZoomLevel: 0.5,
    defaultZoomLevel: 1,
    homeFillsViewer: false,
    showFullPageControl: false,
    showZoomControl: false,
    showSequenceControl: false,
    showReferenceStrip: false,
    showHomeControl: false, // ✅ Hide the home button
    gestureSettingsMouse: {
      scrollToZoom: false, // Disable zoom on scroll
      clickToZoom: false, // Disable zoom on click
      dblClickToZoom: false // Disable zoom on double-click
    }
  })

  console.log('OpenSeadragon initialized successfully!')

  try {
    // ✅ Dynamically import the non-ESM module
    const module = await import('openseadragon-filtering')

    if (module && module.default) {
      console.log('OpenSeadragonFiltering loaded!')
    }
    // Store the plugin reference
  } catch (error) {
    console.error('Error loading OpenSeadragonFiltering:', error)
  }

  // Manually add the navigator if needed
  viewer.value.addHandler('open', function () {
    viewer.value.navigator.update()
    console.log('Navigator updated!')
  })

  updateMagnification()

  viewer.value.addHandler('open', () => {
    console.log('OpenSeadragon image loaded, initializing Annotorious...')

    annotator.value = createOSDAnnotator(viewer.value, {
      drawingEnabled: false,

      style: {
        stroke: '#0000FF',
        strokeWidth: 3,
        fill: 'rgba(0, 0, 255, 0.2)',
        fillOpacity: 0
      }
    })

    console.log('Annotorious initialized!')

    // ✅ Detect when clicking outside annotations to deselect
    viewerContainer.value.addEventListener('click', event => {
      if (!event.target.closest('.a9s-annotation')) {
        console.log('Deselecting annotation...')
        selectedAnnotation.value = null
      }
    })

    annotator.value.on('clickAnnotation', (annotation, originalEvent) => {
      selectedAnnotation.value = annotation
      console.log(annotation)
      console.log('this is anno', annotation)
      console.log('this is oe', originalEvent)
      setPopupPosition(annotation)
      console.log('Annotation clicked: ' + annotation.id)
    })
  })

  // viewer.value.addHandler('open', () => {
  //   if (window.OpenSeadragonFiltering) {
  //     filtering.value = new OpenSeadragonFiltering(viewer.value, {
  //       filters: [
  //         { name: 'brightness', value: brightness.value },
  //         { name: 'contrast', value: contrast.value },
  //         { name: 'gamma', value: gamma.value }
  //       ]
  //     })

  //     console.log('OpenSeadragonFiltering enabled!')
  //   } else {
  //     console.error('OpenSeadragonFiltering is not loaded!')
  //   }
  // })
})

const red = ref(1.0)
const green = ref(1.0)
const blue = ref(1.0)

const updateRGB = () => {
  if (!viewer.value) return

  viewer.value.setFilterOptions({
    filters: [
      {
        processors: [
          function (context, callback) {
            const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
            const data = imageData.data

            for (let i = 0; i < data.length; i += 4) {
              data[i] = Math.min(255, data[i] * red.value) // Scale Red
              data[i + 1] = Math.min(255, data[i + 1] * green.value) // Scale Green
              data[i + 2] = Math.min(255, data[i + 2] * blue.value) // Scale Blue
            }

            context.putImageData(imageData, 0, 0)
            callback()
          }
        ]
      }
    ]
  })

  console.log(`RGB Updated -> Red: ${red.value}, Green: ${green.value}, Blue: ${blue.value}`)
}

const brightness = ref(100)
const contrast = ref(100)
const gamma = ref(1.0)

// Function to update OpenSeadragon filters
const updateFilter = () => {
  if (!viewer.value) return

  viewer.value.setFilterOptions({
    filters: [
      {
        processors: [
          OpenSeadragon.Filters.BRIGHTNESS(brightness.value / 10),
          OpenSeadragon.Filters.CONTRAST(contrast.value / 100),
          OpenSeadragon.Filters.GAMMA(gamma.value)
        ]
      }
    ]
  })

  console.log(`Filters Updated -> Brightness: ${brightness.value}, Contrast: ${contrast.value}, Gamma: ${gamma.value}`)
}

const cancelAnnotation = () => {
  if (selectedAnnotation.value && annotator.value) {
    const annotationId = selectedAnnotation.value.id // Get annotation ID
    console.log(`Removing annotation with ID: ${annotationId}`)

    // Remove annotation from Annotorious
    annotator.value.removeAnnotation(annotationId)

    // Clear the selected annotation
    selectedAnnotation.value = null
  } else {
    console.warn('No annotation selected or annotator not initialized!')
  }
}

const selectedSidebarItem = ref<string | null>(null) // Track selected item
const handleSidebarSelection = (label: string) => {
  selectedSidebarItem.value = label

  if (annotator.value) {
    if (label === 'Annotate') {
      // ✅ Enable drawing mode but restrict to rectangles
      annotator.value.setDrawingEnabled(true)
      annotator.value.setDrawingTool('rectangle') // Ensure rectangles are set
      annotator.value.setSetting('freehand', false) // Ensure freehand is disabled
    } else if (label === 'Blue') {
      // ✅ Enable freehand drawing mode
      annotator.value.setDrawingEnabled(true)
      annotator.value.setDrawingTool('polygon') // Some versions require 'polygon' for freehand
      annotator.value.setSetting('freehand', true) // Enable freehand mode
    } else {
      // ✅ Disable drawing if another option is selected
      annotator.value.setDrawingEnabled(false)
    }
  }
}

const popupStyle = ref({ top: '0px', left: '0px' })
const savedAnnotations = ref<{ [key: string]: { label: string } }>({})

const saveAnnotation = () => {
  if (selectedAnnotation.value) {
    console.log('Saving annotation:', selectedAnnotation.value.id)

    // Ensure Vue tracks updates properly
    savedAnnotations.value = {
      ...savedAnnotations.value, // Keep existing annotations
      [selectedAnnotation.value.id]: {
        label: selectedAnnotation.value.label || 'For Review'
      }
    }

    console.log('Saved Annotations:', savedAnnotations.value)

    // Ensure popup updates
    selectedAnnotation.value = null
  }
}

// const setPopupPosition = annotation => {
//   if (!viewer.value) return
//   // Set the selected annotation
//   selectedAnnotation.value = annotation

//   // If annotation is saved, apply the saved label
//   if (savedAnnotations.value[annotation.id]) {
//     selectedAnnotation.value = {
//       ...annotation,
//       label: savedAnnotations.value[annotation.id].label // Restore saved label
//     }
//   }

//   const selector = annotation.target.selector

//   // Extract coordinates from the RECTANGLE selector
//   const { x, y, w, h } = selector.geometry

//   // Convert coordinates to OpenSeadragon viewport coordinates
//   const viewportPoint = viewer.value.viewport.imageToViewportCoordinates(x + w, y)

//   // Convert viewport coordinates to screen coordinates
//   const imagePixel = viewer.value.viewport.viewportToViewerElementCoordinates(viewportPoint)

//   console.log('Popup position:', imagePixel)

//   // Update popup position
//   popupStyle.value = {
//     top: `${imagePixel.y}px`,
//     left: `${imagePixel.x + 15}px` // Slight offset for better visibility
//   }
//   console.log('test', annotation.id)
//   // If annotation is saved, update its state
// }

const setPopupPosition = annotation => {
  if (!viewer.value) return

  selectedAnnotation.value = annotation

  if (savedAnnotations.value[annotation.id]) {
    selectedAnnotation.value = {
      ...annotation,
      label: savedAnnotations.value[annotation.id].label
    }
  }

  const selector = annotation.target.selector
  let viewportPoint

  if (selector.type === 'RECTANGLE') {
    // ✅ Rectangle: Use x, y, w, h for positioning
    const { x, y, w, h } = selector.geometry

    // Convert coordinates to OpenSeadragon viewport coordinates
    const viewportPoint = viewer.value.viewport.imageToViewportCoordinates(x + w, y)

    // Convert viewport coordinates to screen coordinates
    const imagePixel = viewer.value.viewport.viewportToViewerElementCoordinates(viewportPoint)

    console.log('Popup position:', imagePixel)

    // Update popup position
    popupStyle.value = {
      top: `${imagePixel.y}px`,
      left: `${imagePixel.x + 15}px` // Slight offset for better visibility
    }
    console.log('test', annotation.id)
  } else if (selector.type === 'POLYGON') {
    console.log('Polygon annotation:', selector.geometry)

    const points = selector.geometry.points // ✅ Extract polygon points array

    if (!points || points.length === 0) return

    // ✅ Compute centroid (average of all points)
    let sumX = 0,
      sumY = 0
    points.forEach(([x, y]) => {
      sumX += x
      sumY += y
    })

    const centroidX = sumX / points.length
    const centroidY = sumY / points.length

    console.log('Computed Centroid:', { x: centroidX, y: centroidY })

    // ✅ Convert to OpenSeadragon coordinates
    viewportPoint = viewer.value.viewport.imageToViewportCoordinates(centroidX, centroidY)
  }

  if (!viewportPoint) return

  // ✅ Convert viewport to screen coordinates
  const imagePixel = viewer.value.viewport.viewportToViewerElementCoordinates(viewportPoint)

  console.log('Popup position:', imagePixel)

  // ✅ Update popup position
  popupStyle.value = {
    top: `${imagePixel.y}px`,
    left: `${imagePixel.x + 50}px` // Slight offset for better visibility
  }

  console.log('Annotation ID:', annotation.id)
}

const updateMagnification = () => {
  if (!viewer.value) return

  const zoomLevel = parseFloat(magnification.value) // Ensure it's a float
  console.log('Zoom Level:', zoomLevel) // Debugging output

  viewer.value.viewport.zoomTo(zoomLevel)
  viewer.value.viewport.applyConstraints()
}

// Function to move the viewport
const moveViewport = (direction: string) => {
  if (!viewer.value) return

  const panAmount = 0.1 // Adjust movement speed
  const viewport = viewer.value.viewport
  const currentCenter = viewport.getCenter()

  switch (direction) {
    case 'up':
      viewport.panTo(new OpenSeadragon.Point(currentCenter.x, currentCenter.y - panAmount))
      break
    case 'down':
      viewport.panTo(new OpenSeadragon.Point(currentCenter.x, currentCenter.y + panAmount))
      break
    case 'left':
      viewport.panTo(new OpenSeadragon.Point(currentCenter.x - panAmount, currentCenter.y))
      break
    case 'right':
      viewport.panTo(new OpenSeadragon.Point(currentCenter.x + panAmount, currentCenter.y))
      break
  }

  viewport.applyConstraints() // Ensure boundaries are respected
}

const removeAllAnnotations = () => {
  if (annotator.value) {
    const annotations = annotator.value.getAnnotations()

    if (annotations.length === 0) {
      console.warn('No annotations to remove!')
      return
    }

    console.log(`Removing ${annotations.length} annotations...`)

    annotations.forEach(annotation => {
      annotator.value.removeAnnotation(annotation.id)
    })

    console.log('All annotations removed successfully!')
  } else {
    console.error('Annotator is not initialized!')
  }
}

// Function to return image path dynamically based on slide ID

const menuItems = ref([
  { label: 'AI Insights', icon: aiIcon, open: false, type: 'AI Insights' },
  { label: 'Microscope Control', icon: microscopeIcon, open: false, type: 'Microscope Control' },
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
  { label: 'Diagnostic', icon: diagnosticIcon, open: false, type: 'Diagnostic' }
])

const annotations = [
  { image: anno1, label: 'Annotate #1' },
  { image: anno2, label: 'Annotate #2' }
]

const diagnosticText = ref(
  `• Invasive squamous cell carcinoma, moderately differentiated, involving the dermis. Margins are free of tumor.\n` +
    `• Right Eye: Normal fundus examination.\n` +
    `• Left Eye: Borderline cup-to-disc ratio. Possible drusen noted in the superior temporal quadrant. Recommend follow-up examination in 6 months to monitor for any changes.`
)

const dropdownStates = ref<{ [key: string]: boolean[] }>({})

// Function to initialize dropdown states for each slide
const initializeDropdownStates = () => {
  selectedSlideIds.value.forEach(slideId => {
    if (!dropdownStates.value[slideId]) {
      dropdownStates.value[slideId] = menuItems.value.map(() => false)
    }
  })
}

const toggleDropdown = (slideId: string, index: number) => {
  if (!dropdownStates.value[slideId]) {
    dropdownStates.value[slideId] = []
  }

  // Only allow opening, prevent closing on menu click
  if (!dropdownStates.value[slideId][index]) {
    dropdownStates.value[slideId][index] = true
  }
}

const closeDropdown = (slideId: string, index: number) => {
  if (dropdownStates.value[slideId]) {
    dropdownStates.value[slideId][index] = false
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

.main-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
}

// Seadragon Stuff
.openseadragon-viewer {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.osdcontainer {
  width: 100%;
  height: 100px;
  margin-bottom: 5px;
}

.osd-navigator {
  position: relative; /* Ensures it's positioned relative to parent */
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid white;
  border-radius: 8px;
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
    background-color: rgba(30, 41, 59, 0.84);
    color: white;
    font-size: 14px;
    padding: 12px;
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
    font-weight: thin;
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

// Microscope
.microscope-control {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 12px;
}

.microscope-image img {
  width: 100% !important;
  height: 100% !important;
  border-radius: 8px;
}

.color-btn {
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.low {
  background: #2c3553;
  color: white;
}

.medium {
  background: #1f4cb5;
  color: white;
}

.high {
  background: #0e214f;
  color: white;
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

.divider {
  width: 80%;
  height: 1px;
  background: #ddd;
  margin: 10px 0;
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

/* XYZ Position Controls */
.xyz-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .arrow {
    display: flex; /* Enables flexbox */
    align-items: center;
    justify-content: center;
    background: #2c3553;
    color: white;
    border: 1px solid #5b6c9e;
    border-radius: 6px;
    padding: 10px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .arrow:hover {
    background: #1f4cb5;
  }

  /* Make Up & Down buttons the same size as Left & Right */
  .up,
  .down {
    width: 30px;
    height: 40px;
  }

  .middle-buttons {
    display: flex;
    flex-direction: row;
    gap: 30px;

    .left,
    .right {
      display: flex; /* Ensures arrow centers inside */
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 30px;
    }
  }
}

/* Slider Styles */
.slider-container {
  display: flex;
  flex-direction: column;
  gap: 5px;

  h4 {
    font-size: 16px;
    font-weight: bold;
    color: white;
    margin-bottom: 5px;
  }
}

.slider-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 12px;
}

/* Range Input */
input[type='range'] {
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 10px;
  background: linear-gradient(to right, #4a90e2, #5b6c9e);
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

/* Track (for Webkit browsers) */
input[type='range']::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 10px;
  background: linear-gradient(to right, #20c997, #00a6ff);
}

/* Slider Thumb */
input[type='range']::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -5px; /* Adjusts thumb alignment */
}

input[type='range']::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  border: 2px solid #20c997;
  cursor: pointer;
}

/* Slider Labels */
.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: white;
}

/* Color Adjustment Styling */
.color-adjustment {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.color-btn {
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  background: #2c3553;
  color: white;
  font-size: 14px;
  transition: all 0.2s ease-in-out;

  &.active {
    background: #20c997; /* Active selection color */
    color: #ffffff;
    font-weight: bold;
    border: 2px solid #00a6ff;
  }
}

.low {
  background: #2c3553;
  color: white;
}

.medium {
  background: #1f4cb5;
  color: white;
}

.high {
  background: #0e214f;
  color: white;
}

// XYZ SECTION BOX
.xyz-section {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 10px;
}
.xyz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

/* General Dropdown Styling */
.xyz-dropdown,
.speed-dropdown {
  width: 100%;
  background: #2c3553;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Dropdown Select */
.xyz-dropdown select,
.speed-dropdown select {
  background: none;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  appearance: none;
}

/* Custom Dropdown Arrow */
.xyz-dropdown::after,
.speed-dropdown::after {
  content: '▼';
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  pointer-events: none;
}

/* Measurement Display */
.xyz-value {
  background: #2c3553;
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
}

/* Speed Selector */
.speed-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: white;
}

.flexcol {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.flexrow {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.controlcol {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 140px;
}

.osd-container {
  width: 100%;
  height: 600px; /* Adjust height as needed */
  border: 1px solid #ccc;
}

.openseadragon-viewer {
  width: 100%;
  height: 100%;
}

/* AI Insights Styling */
.ai-insights {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  color: white;

  h3 {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ai-section {
    display: flex;
    flex-direction: column;
    gap: 6px;

    h4 {
      font-size: 16px;
      font-weight: bold;
      color: white;
    }

    p {
      font-size: 14px;
      color: #d0d3e2;
    }
  }

  .divider {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 10px 0;
  }
}

/* Diagnostic by AI Styling */
.diagnostic-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 15px;
  border-radius: 12px;
  color: white;

  h3 {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .subtext {
    font-size: 14px;
    font-style: italic;
    color: #b0b3c0;
  }

  .diagnostic-textarea {
    width: 100%;
    height: 150px; /* Set fixed height to enable scrolling */
    background: #747c91;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    color: white;
    padding: 10px;
    font-size: 14px;
    outline: none;
    resize: none; /* Prevent manual resizing */
    overflow: auto; /* Enable scrolling */
    line-height: 1.5;
  }

  .edit-button {
    background: #20a6ff;
    color: white;
    font-size: 14px;
    padding: 10px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    width: 60px;

    &:hover {
      background: #1a8ed1;
    }
  }
}

.annotation-popup {
  position: absolute;
  background: #1b243f;
  border-radius: 8px;
  padding: 10px;
  width: 220px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 5px;
    margin-bottom: 2px;
    color: white;
  }
}

.popup-header {
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.popup-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  label {
    color: white;
  }
}

.popup-actions {
  display: flex;
  gap: 10px;
}

.btn {
  background: white;
  width: 100%;
  color: black;
  padding: 4px;
  border-radius: 6px;
  cursor: pointer;
}

.annotation-label-box {
  position: absolute;
  background: #28314d; /* Dark navy background */
  color: white;
  padding: 10px 15px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: 'Inter', sans-serif;
  width: 150px;
  text-align: left;
  z-index: 1000;

  .label-text {
    font-size: 14px;
    color: #a0a8c0; /* Lighter grey for "Label" text */
    font-weight: 500;
  }

  .label-value {
    font-size: 16px;
    font-weight: bold;
    color: white;
  }
}

.ai-section ul {
  list-style-type: disc; /* Ensures bullets appear */
  margin-left: 20px; /* Indents the list */
  padding-left: 20px;
}

.ai-section li {
  margin-bottom: 8px; /* Adds spacing between list items */
}
</style>
