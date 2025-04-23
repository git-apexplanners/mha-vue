import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Create a mock SelectOption component
const SelectOption = defineComponent({
  name: 'SelectOption',
  props: {
    value: {
      type: [String, Number, Boolean, Object],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  template: `
    <option :value="value" :disabled="disabled">
      <slot></slot>
    </option>
  `
})

describe('SelectOption', () => {
  it('renders properly with required props', () => {
    const wrapper = mount(SelectOption, {
      props: {
        value: 'option1'
      },
      slots: {
        default: 'Option 1'
      }
    })
    
    // Check if option element is rendered
    const option = wrapper.find('option')
    expect(option.exists()).toBe(true)
    
    // Check props
    expect(option.attributes('value')).toBe('option1')
    expect(option.attributes('disabled')).toBeFalsy()
    
    // Check slot content
    expect(option.text()).toBe('Option 1')
  })
  
  it('applies disabled prop correctly', () => {
    const wrapper = mount(SelectOption, {
      props: {
        value: 'option1',
        disabled: true
      }
    })
    
    const option = wrapper.find('option')
    expect(option.attributes('disabled')).toBe('')
  })
  
  it('works with number value', () => {
    const wrapper = mount(SelectOption, {
      props: {
        value: 42
      }
    })
    
    const option = wrapper.find('option')
    expect(option.attributes('value')).toBe('42')
  })
  
  it('works with boolean value', () => {
    const wrapper = mount(SelectOption, {
      props: {
        value: true
      }
    })
    
    const option = wrapper.find('option')
    expect(option.attributes('value')).toBe('true')
  })
})
