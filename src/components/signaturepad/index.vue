<template>
  <div class="signature-container">
    <VueSignaturePad ref="signaturePad" :options="options" class="signature-pad" />
    <div class="controls">
      <button @click="clearSignature">Reset</button>
      <button @click="saveSignature">Save</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueSignaturePad } from 'vue-signature-pad'

const signaturePad = ref(null)

// Clear the signature
const clearSignature = () => {
  signaturePad.value.clearSignature()
}

// Save the signature as an image
const saveSignature = () => {
  const data = signaturePad.value.saveSignature()
  console.log('Saved Signature:', data)
}

const options = {
  penColor: 'black',
  backgroundColor: 'white'
}
</script>

<style>
.signature-container {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  background: #f8f9ff;
}

.signature-pad {
  width: 100%;
  height: 200px;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #4f46e5;
  color: white;
  font-weight: bold;
}

button:hover {
  background: #4338ca;
}
</style>
