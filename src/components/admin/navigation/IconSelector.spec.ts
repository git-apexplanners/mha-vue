import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconSelector from './IconSelector.vue'

describe('IconSelector', () => {
  it('renders properly', () => {
    const wrapper = mount(IconSelector, {
      props: {
        modelValue: ''
      }
    })
    
    expect(wrapper.text()).toContain('No icon selected')
    expect(wrapper.find('.grid').exists()).toBe(true)
  })
  
  it('displays the selected icon', () => {
    const wrapper = mount(IconSelector, {
      props: {
        modelValue: 'home'
      }
    })
    
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.find('svg').exists()).toBe(true)
  })
  
  it('emits update:modelValue event when an icon is selected', async () => {
    const wrapper = mount(IconSelector, {
      props: {
        modelValue: ''
      }
    })
    
    // Find and click the first icon button
    const iconButton = wrapper.find('.grid button')
    await iconButton.trigger('click')
    
    // Check if the update:modelValue event was emitted
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted[0]).toBeTruthy()
  })
  
  it('clears the selected icon', async () => {
    const wrapper = mount(IconSelector, {
      props: {
        modelValue: 'home'
      }
    })
    
    // Find and click the clear button
    const clearButton = wrapper.find('button[type="button"].text-muted-foreground')
    await clearButton.trigger('click')
    
    // Check if the update:modelValue event was emitted with empty string
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted[0]).toEqual([''])
  })
})
