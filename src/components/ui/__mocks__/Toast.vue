<![CDATA[<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'Toast',
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['default', 'destructive', 'success'].includes(value)
      }
    },
    duration: {
      type: Number,
      default: 5000
    },
    open: {
      type: Boolean,
      default: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const isVisible = ref(props.open)
    let timeout: number | null = null

    const toastClasses = computed(() => {
      const variantClasses = {
        default: 'border bg-background',
        destructive: 'destructive border-destructive bg-destructive text-destructive-foreground',
        success: 'border-green-500 bg-green-500 text-white'
      }

      return [
        'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
        variantClasses[props.variant as keyof typeof variantClasses],
        isVisible.value ? 'animate-in slide-in-from-right' : 'animate-out slide-out-to-right'
      ].join(' ')
    })

    const handleClose = () => {
      isVisible.value = false
      setTimeout(() => {
        emit('close')
      }, 300) // Wait for animation to complete
    }

    onMounted(() => {
      if (props.duration > 0) {
        timeout = window.setTimeout(handleClose, props.duration)
      }
    })

    onUnmounted(() => {
      if (timeout) {
        clearTimeout(timeout)
      }
    })

    return {
      isVisible,
      toastClasses,
      handleClose
    }
  }
})
</script>

<template>
  <div v-if="isVisible" :class="toastClasses" data-state="open">
    <div class="grid gap-1">
      <div v-if="title" class="text-sm font-semibold">{{ title }}</div>
      <div v-if="description" class="text-sm opacity-90">{{ description }}</div>
    </div>
    <button
      class="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
      @click="handleClose"
      aria-label="Close"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
</template>]]>
