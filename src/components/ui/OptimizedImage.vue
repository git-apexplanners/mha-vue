<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'OptimizedImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    height: {
      type: [Number, String],
      default: 'auto'
    },
    loading: {
      type: String,
      default: 'lazy',
      validator: (value: string) => ['lazy', 'eager'].includes(value)
    },
    class: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const isLoaded = ref(false)
    const isError = ref(false)
    const placeholderSrc = ref('/images/placeholder.jpg')

    const handleLoad = () => {
      isLoaded.value = true
    }

    const handleError = () => {
      isError.value = true
    }

    // Preload important images if not lazy loading
    onMounted(() => {
      if (props.loading === 'eager') {
        const img = new Image()
        img.src = props.src
      }
    })

    return {
      isLoaded,
      isError,
      placeholderSrc,
      handleLoad,
      handleError
    }
  }
})
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Placeholder or error image -->
    <img
      v-if="!isLoaded || isError"
      :src="isError ? '/images/error.jpg' : placeholderSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :class="'transition-opacity duration-300 ' + (isLoaded ? 'opacity-0' : 'opacity-100') + ' ' + class"
    />

    <!-- Actual image -->
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      @load="handleLoad"
      @error="handleError"
      :class="'absolute top-0 left-0 transition-opacity duration-300 ' + (isLoaded && !isError ? 'opacity-100' : 'opacity-0') + ' ' + class"
    />
  </div>
</template>
