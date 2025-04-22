<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  htmlFor: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})

const labelClasses = computed(() => {
  return 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
})
</script>

<template>
  <label :for="htmlFor" :class="labelClasses">
    <slot></slot>
    <span v-if="required" class="text-destructive ml-1">*</span>
  </label>
</template>
