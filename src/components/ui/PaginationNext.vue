<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  href: {
    type: String,
    default: '#'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const classes = computed(() => {
  return [
    'flex h-10 items-center justify-center rounded-md px-3 text-sm transition-colors',
    props.disabled
      ? 'pointer-events-none opacity-50'
      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
  ].join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <a :href="href" :class="classes" aria-label="Go to next page" @click.prevent="handleClick">
    <span>Next</span>
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
      class="h-4 w-4 ml-2"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  </a>
</template>
