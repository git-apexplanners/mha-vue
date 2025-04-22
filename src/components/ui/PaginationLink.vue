<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  href: {
    type: String,
    default: '#'
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const classes = computed(() => {
  return [
    'flex h-10 w-10 items-center justify-center rounded-md text-sm transition-colors',
    props.isActive
      ? 'bg-primary text-primary-foreground'
      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
  ].join(' ')
})

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <a :href="href" :class="classes" @click.prevent="handleClick">
    <slot></slot>
  </a>
</template>
