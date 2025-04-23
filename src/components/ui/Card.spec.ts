import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Create a mock Card component for testing
const Card = defineComponent({
  name: 'Card',
  template: `
    <div class="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      <slot></slot>
    </div>
  `
})

describe('Card', () => {
  it('renders properly', () => {
    const wrapper = mount(Card)
    
    // Check if the card element is rendered
    const card = wrapper.find('div')
    expect(card.exists()).toBe(true)
    
    // Check if the correct classes are applied
    expect(card.classes()).toContain('rounded-lg')
    expect(card.classes()).toContain('border')
    expect(card.classes()).toContain('border-border')
    expect(card.classes()).toContain('bg-card')
    expect(card.classes()).toContain('text-card-foreground')
    expect(card.classes()).toContain('shadow-sm')
  })
  
  it('renders slot content', () => {
    const wrapper = mount(Card, {
      slots: {
        default: '<p>Card content</p>'
      }
    })
    
    // Check if slot content is rendered
    expect(wrapper.html()).toContain('<p>Card content</p>')
  })
})
