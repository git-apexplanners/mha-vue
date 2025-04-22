<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)

const selectClasses = computed(() => {
  return [
    'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    props.error ? 'border-destructive focus:ring-destructive' : ''
  ].filter(Boolean).join(' ')
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
  emit('change', event)
}
</script>

<template>
  <div class="relative">
    <select
      :id="id"
      :name="name"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :class="selectClasses"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <slot></slot>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4 opacity-50"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  </div>
</template>
