<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
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
  required: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 4
  }
})

const emit = defineEmits(['update:modelValue', 'input', 'change', 'focus', 'blur'])

const textareaClasses = computed(() => {
  return [
    'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    props.error ? 'border-destructive focus-visible:ring-destructive' : ''
  ].filter(Boolean).join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
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
  <textarea
    :id="id"
    :name="name"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :rows="rows"
    :class="textareaClasses"
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  ></textarea>
</template>
