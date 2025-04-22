<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Label',
  props: {
    htmlFor: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    labelClasses() {
      return [
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      ]
    }
  }
})
</script>

<template>
  <label :for="htmlFor" :class="labelClasses">
    <slot></slot>
    <span v-if="required" class="text-destructive ml-1">*</span>
  </label>
</template>
