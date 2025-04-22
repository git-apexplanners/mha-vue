<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
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
  autocomplete: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:value', 'input', 'change', 'focus', 'blur'])

const inputClasses = computed(() => {
  return [
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    props.error ? 'border-destructive focus-visible:ring-destructive' : ''
  ].filter(Boolean).join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:value', target.value)
  emit('input', event)
}

const handleChange = (event: Event) => {
  emit('change', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<template>
  <input
    :id="id"
    :name="name"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :autocomplete="autocomplete"
    :class="inputClasses"
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>
