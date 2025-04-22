<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
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

const switchClasses = computed(() => {
  return [
    'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
    props.modelValue ? 'bg-primary' : 'bg-input'
  ].join(' ')
})

const thumbClasses = computed(() => {
  return [
    'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
    props.modelValue ? 'translate-x-5' : 'translate-x-0'
  ].join(' ')
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', event)
}
</script>

<template>
  <div class="inline-flex items-center">
    <input
      :id="id"
      :name="name"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :required="required"
      class="sr-only"
      @change="handleChange"
    />
    <label
      :for="id"
      :class="switchClasses"
      :data-state="modelValue ? 'checked' : 'unchecked'"
      :aria-checked="modelValue"
      role="switch"
    >
      <span
        :class="thumbClasses"
        :data-state="modelValue ? 'checked' : 'unchecked'"
      ></span>
    </label>
  </div>
</template>
