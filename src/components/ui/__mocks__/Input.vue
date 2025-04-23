<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Input',
  props: {
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
  },
  emits: ['update:value', 'input', 'change', 'focus', 'blur'],
  setup(props, { emit }) {
    const inputClasses = computed(() => {
      return [
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.error ? 'border-destructive focus-visible:ring-destructive' : ''
      ].filter(Boolean).join(' ')
    })

    const handleInput = (event) => {
      emit('update:value', event.target.value)
      emit('input', event)
    }

    const handleChange = (event) => {
      emit('change', event)
    }

    const handleFocus = (event) => {
      emit('focus', event)
    }

    const handleBlur = (event) => {
      emit('blur', event)
    }

    return {
      inputClasses,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur
    }
  }
})
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
