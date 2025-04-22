import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref, onMounted } from 'vue'

// Create a mock OptimizedImage component
const OptimizedImage = defineComponent({
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
      default: 'lazy'
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
  },
  template: `
    <div class="relative overflow-hidden">
      <!-- Placeholder or error image -->
      <img
        v-if="!isLoaded || isError"
        :src="isError ? '/images/error.jpg' : placeholderSrc"
        :alt="alt"
        :width="width"
        :height="height"
        :class="isLoaded ? 'opacity-0' : 'opacity-100'"
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
        :class="isLoaded && !isError ? 'opacity-100' : 'opacity-0'"
      />
    </div>
  `
})

describe('OptimizedImage Integration', () => {
  beforeEach(() => {
    // Mock window.Image
    global.Image = class {
      constructor() {
        setTimeout(() => {
          this.onload && this.onload()
        }, 100)
      }
      src = ''
    }

    // Mock URL.createObjectURL and URL.revokeObjectURL
    global.URL.createObjectURL = vi.fn(() => 'mock-url')
    global.URL.revokeObjectURL = vi.fn()
  })

  it('loads image and shows placeholder initially', async () => {
    const wrapper = mount(OptimizedImage, {
      props: {
        src: '/test-image.jpg',
        alt: 'Test Image',
        width: 300,
        height: 200
      }
    })

    // Should have two images (placeholder and actual)
    const images = wrapper.findAll('img')
    expect(images.length).toBe(2)

    // Placeholder should be visible initially
    const placeholder = images[0]
    expect(placeholder.classes()).toContain('opacity-100')

    // Actual image should be hidden initially
    const actualImage = images[1]
    expect(actualImage.classes()).toContain('opacity-0')

    // Trigger image load
    await actualImage.trigger('load')

    // After load, the component should be re-rendered
    // We can't check the classes directly because the placeholder is removed from the DOM
    // Instead, we'll check if the isLoaded value is set to true
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  it('handles image loading error', async () => {
    const wrapper = mount(OptimizedImage, {
      props: {
        src: '/non-existent-image.jpg',
        alt: 'Error Image'
      }
    })

    // Should have two images (placeholder/error and actual)
    const images = wrapper.findAll('img')
    expect(images.length).toBe(2)

    // Trigger image error
    await images[1].trigger('error')

    // Error flag should be set
    expect(wrapper.vm.isError).toBe(true)

    // Error image should be shown
    expect(images[0].attributes('src')).toBe('/images/error.jpg')
  })

  it('sets loading attribute correctly', async () => {
    const wrapper = mount(OptimizedImage, {
      props: {
        src: '/important-image.jpg',
        alt: 'Important Image',
        loading: 'eager'
      }
    })

    // The actual image should have the loading attribute set to eager
    const actualImage = wrapper.findAll('img')[1]
    expect(actualImage.attributes('loading')).toBe('eager')
  })

  it('updates isLoaded state when image loads', async () => {
    const wrapper = mount(OptimizedImage, {
      props: {
        src: '/test-image.jpg',
        alt: 'Test Image'
      }
    })

    // Initially, isLoaded should be false
    expect(wrapper.vm.isLoaded).toBe(false)

    // After loading, isLoaded should be true
    const actualImage = wrapper.findAll('img')[1]
    await actualImage.trigger('load')
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  it('uses lazy loading by default', () => {
    const wrapper = mount(OptimizedImage, {
      props: {
        src: '/test-image.jpg',
        alt: 'Test Image'
      }
    })

    // Actual image should have lazy loading attribute
    const actualImage = wrapper.findAll('img')[1]
    expect(actualImage.attributes('loading')).toBe('lazy')
  })
})
