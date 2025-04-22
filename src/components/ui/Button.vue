<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value: string) => {
      return ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'default',
    validator: (value: string) => {
      return ['default', 'sm', 'lg', 'icon'].includes(value)
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button'
  },
  asChild: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline'
  }

  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10'
  }

  return [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    variantClasses[props.variant as keyof typeof variantClasses],
    sizeClasses[props.size as keyof typeof sizeClasses]
  ].join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    v-if="!asChild"
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
  <component
    v-else
    :is="'div'"
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </component>
</template>
