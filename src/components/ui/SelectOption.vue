<script setup lang="ts">
const props = defineProps({
  value: {
    type: [String, Number, Boolean, Object],
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <option :value="value" :disabled="disabled">
    <slot></slot>
  </option>
</template>
