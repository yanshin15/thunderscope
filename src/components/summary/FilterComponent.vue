<template>
  <div class="filter-component">
    <!-- Label Section: Clicking toggles the dropdown -->
    <div
      class="filter-label"
      role="button"
      :aria-expanded="isOpen.toString()"
      :aria-controls="dropdownId"
      :aria-haspopup="true"
      @click="toggleDropdown"
    >
      <div class="label-arrow">
        <span class="label">{{ label }}</span>
        <span class="arrow">{{ isOpen ? '˄' : '˅' }}</span>
      </div>
      <span class="selected">{{ selectedOption }}</span>
    </div>

    <!-- Dropdown Section: Visible when isOpen is true -->
    <div v-if="isOpen" :id="dropdownId" class="dropdown" role="listbox" aria-labelledby="filter-label">
      <div
        v-for="option in options"
        :key="option.value"
        class="dropdown-option"
        role="option"
        :aria-selected="selectedOption === option.label ? 'true' : 'false'"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterComponent',
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    defaultOption: {
      type: String,
      default: 'Select'
    }
  },
  data() {
    return {
      isOpen: false,
      // Use the defaultOption prop to initialize selectedOption
      selectedOption: this.defaultOption || 'Select',
      dropdownId: `dropdown-${this._uid}` // Unique dropdown id for accessibility
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.selectedOption = option.label
      this.isOpen = false
      this.$emit('filter-selected', option)
    }
  }
}
</script>

<style scoped>
.filter-component {
  position: relative;
  min-width: 200px;
  max-width: 100%;
}

.filter-label {
  cursor: pointer;
  padding: 5px 15px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #ffffff;
  min-height: 90px;
  display: flex;
  flex-direction: column;
}

.label-arrow {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.label {
  color: gray;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.arrow {
  font-size: 16px;
}

.selected {
  margin-top: 5px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ced4da;
  background: white;
  z-index: 10;
  border-radius: 4px;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
   */
}

.dropdown-option {
  padding: 10px;
  cursor: pointer;
}

.dropdown-option:hover {
  background: #f0f0f0;
}

.dropdown-option[aria-selected='true'] {
  background: #e9ecef;
}
</style>
