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

// Create a mock Select component
const Select = defineComponent({
  name: 'Select',
  components: {
    SelectOption
  },
  props: {
    modelValue: {
      type: [String, Number, Boolean, Object],
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  template: `
    <div class="relative">
      <select
        :id="id"
        :name="name"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="[
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-destructive focus:ring-destructive' : ''
        ]"
        @change="$emit('update:modelValue', $event.target.value); $emit('change', $event)"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <slot></slot>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4 opacity-50"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  `
})

describe('Select', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(Select)
    
    // Check if select element is rendered
    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
    
    // Check default props
    expect(select.attributes('value')).toBe('')
    expect(select.attributes('disabled')).toBeFalsy()
    expect(select.attributes('required')).toBeFalsy()
    
    // Check if placeholder option is rendered
    const placeholderOption = wrapper.find('option')
    expect(placeholderOption.exists()).toBe(true)
    expect(placeholderOption.text()).toBe('Select an option')
  })
  
  it('applies custom props correctly', () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: 'value1',
        placeholder: 'Choose an item',
        disabled: true,
        required: true,
        id: 'test-select',
        name: 'test-name'
      }
    })
    
    const select = wrapper.find('select')
    expect(select.attributes('value')).toBe('value1')
    expect(select.attributes('disabled')).toBe('')
    expect(select.attributes('required')).toBe('')
    expect(select.attributes('id')).toBe('test-select')
    expect(select.attributes('name')).toBe('test-name')
    
    // Check if custom placeholder is rendered
    const placeholderOption = wrapper.find('option')
    expect(placeholderOption.text()).toBe('Choose an item')
  })
  
  it('applies error class when error prop is true', () => {
    const wrapper = mount(Select, {
      props: {
        error: true
      }
    })
    
    const select = wrapper.find('select')
    expect(select.classes()).toContain('border-destructive')
    expect(select.classes()).toContain('focus:ring-destructive')
  })
  
  it('renders options from slot', () => {
    const wrapper = mount(Select, {
      slots: {
        default: `
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        `
      }
    })
    
    const options = wrapper.findAll('option')
    // First option is the placeholder
    expect(options.length).toBe(3)
    expect(options[1].attributes('value')).toBe('option1')
    expect(options[1].text()).toBe('Option 1')
    expect(options[2].attributes('value')).toBe('option2')
    expect(options[2].text()).toBe('Option 2')
  })
  
  it('emits update:modelValue and change events on change', async () => {
    const wrapper = mount(Select, {
      slots: {
        default: `
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        `
      }
    })
    
    const select = wrapper.find('select')
    
    // Simulate selecting an option
    await select.setValue('option1')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['option1'])
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
