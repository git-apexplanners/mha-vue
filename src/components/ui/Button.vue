<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value: string) => {
      return ['default', 'primary', 'secondary', 'destructive', 'outline', 'ghost', 'link'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'default',
    validator: (value: string) => {
      return ['default', 'sm', 'lg', 'icon'].includes(value)
    }
  },
  asChild: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background'
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'underline-offset-4 hover:underline text-primary'
  }
  
  const sizeClasses = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10'
  }
  
  return `${baseClasses} ${variantClasses[props.variant]} ${sizeClasses[props.size]}`
})

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <component
    :is="asChild ? 'slot' : 'button'"
    :class="buttonClasses"
    @click="handleClick"
  >
    <slot></slot>
  </component>
</template>
