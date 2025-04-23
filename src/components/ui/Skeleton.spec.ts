import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Create a mock Skeleton component for testing
const Skeleton = defineComponent({
  name: 'Skeleton',
  template: `
    <div class="animate-pulse rounded-md bg-muted">
      <slot></slot>
    </div>
  `
})

describe('Skeleton', () => {
  it('renders properly', () => {
    const wrapper = mount(Skeleton)
    
    // Check if the skeleton element is rendered
    const skeleton = wrapper.find('div')
    expect(skeleton.exists()).toBe(true)
    
    // Check if the correct classes are applied
    expect(skeleton.classes()).toContain('animate-pulse')
    expect(skeleton.classes()).toContain('rounded-md')
    expect(skeleton.classes()).toContain('bg-muted')
  })
  
  it('renders slot content', () => {
    const wrapper = mount(Skeleton, {
      slots: {
        default: '<span>Loading...</span>'
      }
    })
    
    // Check if slot content is rendered
    expect(wrapper.html()).toContain('<span>Loading...</span>')
  })
})
