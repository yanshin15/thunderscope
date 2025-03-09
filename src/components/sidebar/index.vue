<template>
  <div class="sidebar">
    <div
      v-for="(item, index) in sidebarItems"
      :key="index"
      class="sidebar-item"
      :class="{ active: selectedItem === item.label, dropdown: item.dropdown }"
      @click="selectItem(item.label)"
    >
      <div class="icon-container">
        <img :src="item.icon" :alt="item.label" />
      </div>
      <span>{{ item.label }}</span>

      <!-- Render divider for every item except the last one -->
      <div v-if="index !== sidebarItems.length - 1" class="divider" />
    </div>
  </div>
  <!-- Image Settings Panel -->
  <div v-if="showImageSettings" class="image-settings-panel">
    <div class="panel-header">
      <span>Image Settings</span>
      <button class="close-btn" @click="showImageSettings = false">×</button>
    </div>
    <div class="divider" />

    <div class="panel-content">
      <div class="slider-group">
        <div class="flexrow">
          <label>Brightness</label>
          <span>{{ props.brightness }}%</span>
        </div>
        <input :value="props.brightness" type="range" min="0" max="200" @input="updateSlider($event, 'brightness')" />
      </div>

      <div class="slider-group">
        <div class="flexrow">
          <label>Contrast</label>
          <span>{{ props.contrast }}%</span>
        </div>
        <input :value="props.contrast" type="range" min="0" max="200" @input="updateSlider($event, 'contrast')" />
      </div>

      <div class="slider-group">
        <div class="flexrow">
          <label>Gamma</label>
          <span>{{ props.gamma }}</span>
        </div>
        <input
          :value="props.gamma"
          type="range"
          min="0.5"
          max="2.0"
          step="0.1"
          @input="updateSlider($event, 'gamma')"
        />
      </div>

      <div class="divider" />
      <div class="slider-group">
        <div class="flexrow">
          <label>Red</label>
          <span>{{ red }}</span>
        </div>
        <input v-model="red" type="range" min="0" max="2" step="0.1" @input="updateRGB('red')" />
      </div>

      <div class="slider-group">
        <div class="flexrow">
          <label>Green</label>
          <span>{{ green }}</span>
        </div>
        <input v-model="green" type="range" min="0" max="2" step="0.1" @input="updateRGB('green')" />
      </div>

      <div class="slider-group">
        <div class="flexrow">
          <label>Blue</label>
          <span>{{ blue }}</span>
        </div>
        <input v-model="blue" type="range" min="0" max="2" step="0.1" @input="updateRGB('blue')" />
      </div>

      <div class="button-group">
        <button class="apply-btn" @click="applySettings">Apply</button>
        <button class="cancel-btn" @click="resetSettings">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

// Import icons
import selectIcon from '@/assets/pathogen/leftpanel/select.png'
import annotateIcon from '@/assets/pathogen/leftpanel/annotate.png'
import blueIcon from '@/assets/pathogen/leftpanel/blue.png'
import gridIcon from '@/assets/pathogen/leftpanel/grid.png'
import imageSettingIcon from '@/assets/pathogen/leftpanel/image-setting.png'
import bookmarkIcon from '@/assets/pathogen/leftpanel/bookmark.png'
import menu from '@/assets/pathogen/leftpanel/menu.png'

const props = defineProps({
  brightness: Number,
  contrast: Number,
  gamma: Number,
  red: Number,
  green: Number,
  blue: Number
})

const red = ref(props.red || 1)
const green = ref(props.green || 1)
const blue = ref(props.blue || 1)

// Sidebar items list with dropdown indicators for 'Annotate' and 'Blue'
const sidebarItems = [
  { label: 'Menu', icon: menu, dropdown: false },
  { label: 'Select', icon: selectIcon, dropdown: false },
  { label: 'Annotate', icon: annotateIcon, dropdown: true },
  { label: 'Blue', icon: blueIcon, dropdown: true },
  { label: 'Grid', icon: gridIcon, dropdown: false },
  { label: 'Image Settings', icon: imageSettingIcon, dropdown: false },
  { label: 'Bookmark', icon: bookmarkIcon, dropdown: false }
]

// Track selected item
const selectedItem = ref<string | null>(null)
const showImageSettings = ref(false)

// Emit event when an item is selected

const emit = defineEmits([
  'update:selected',
  'toggleImageSettings',
  'update-brightness',
  'update-contrast',
  'update-gamma',
  'update-red',
  'update-green',
  'update-blue'
])

const selectItem = (label: string) => {
  selectedItem.value = label

  if (label === 'Image Settings') {
    showImageSettings.value = !showImageSettings.value
  } else {
    emit('itemSelected', label) // Notify parent component
    showImageSettings.value = false
  }
}

const updateSlider = (event, type) => {
  const value = Number(event.target.value)
  emit(`update-${type}`, value) // Emit the updated value to the parent
}

const updateRGB = color => {
  emit(`update-${color}`, color === 'red' ? red.value : color === 'green' ? green.value : blue.value)
}

const applySettings = () => {
  console.log('Applied Settings:', {
    gamma: gamma.value,
    brightness: brightness.value,
    contrast: contrast.value,
    red: red.value,
    green: green.value,
    blue: blue.value
  })
}

// Reset to default values
const resetSettings = () => {
  showImageSettings.value = false
}
const updateSliderBackground = (event: Event, color: string) => {
  const target = event.target as HTMLInputElement
  const value = ((+target.value - +target.min) / (+target.max - +target.min)) * 100
  target.style.background = `linear-gradient(to right, #23e3a6 ${value}%, #374151 ${value}%)`
}
</script>

<style scoped lang="scss">
.sidebar {
  height: 565px;
  width: 80px;
  background-color: #2c3553;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  margin-right: 80px;
  padding: 5px;
}

.sidebar-item {
  width: 100%;
  text-align: center;
  color: white;
  font-size: 12px;
  padding: 5px 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.3s ease-in-out;
  position: relative;
}

.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-item.active {
  border-radius: 8px;
  color: #06ffb8;
}

.sidebar-item img {
  width: 24px;
  height: 24px;
}

.sidebar-item span {
  display: block;
  text-align: center;
  line-height: 14px;
  margin-top: 5px;
}

/* Dropdown Arrow */
.sidebar-item .icon-container {
  position: relative;
}

.sidebar-item .icon-container .dropdown-arrow {
  font-size: 10px;
  color: white;
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
}

/* Image Settings Panel */
.image-settings-panel {
  position: absolute;
  left: 120px;
  width: 260px;
  background-color: rgba(30, 41, 59, 0.84);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  color: white;
  z-index: 3000;
  height: 565px;

  .divider {
    width: calc(100% + 30px); // Adjusts for 15px padding on both sides
    margin-left: -15px;
    background-color: #1d2641;
  }
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}

.panel-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.slider-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
/* Input Range Styling */
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 5px;
  background: linear-gradient(to right, #23e3a6, #1a8ed1); /* Default gradient */
  outline: none;
  transition: background 0.3s ease-in-out;
  cursor: pointer;
}

/* Track Background (Before Thumb) */
input[type='range']::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 5px;
  background: #374151; /* Default background */
}

/* Dynamic Gradient Effect Before the Thumb */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  position: relative;
  z-index: 2;
  margin-top: -4px;
}

/* Apply gradient only before the thumb */
input[type='range']::-moz-range-progress {
  background: linear-gradient(to right, #23e3a6, #1a8ed1);
}

input[type='range']::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #23e3a6 var(--progress), #374151 var(--progress));
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.apply-btn,
.cancel-btn {
  padding: 4px;
  border-radius: 5px;
  cursor: pointer;
  color: black;
  width: 100%;
  background-color: white;
}

.sidebar-item.dropdown .icon-container::after {
  content: '▼'; /* Unicode for dropdown arrow */
  font-size: 10px;
  margin-left: 5px;
  color: white;
  position: absolute;
  right: -15px; /* Adjusts position */
  top: 50%;
  transform: translateY(-50%);
}

.divider {
  width: 60%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 10px 0;
}

.flexrow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
