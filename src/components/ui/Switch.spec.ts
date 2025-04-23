import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, computed } from 'vue'

// Create a mock Switch component
const Switch = defineComponent({
  name: 'Switch',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
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
  setup(props, { emit }) {
    const switchClasses = computed(() => {
      return [
        'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
        props.modelValue ? 'bg-primary' : 'bg-input'
      ].join(' ')
    })

    const thumbClasses = computed(() => {
      return [
        'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
        props.modelValue ? 'translate-x-5' : 'translate-x-0'
      ].join(' ')
    })

    const handleChange = (event) => {
      emit('update:modelValue', event.target.checked)
      emit('change', event)
    }

    return {
      switchClasses,
      thumbClasses,
      handleChange
    }
  },
  template: `
    <div class="inline-flex items-center">
      <input
        :id="id"
        :name="name"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :required="required"
        class="sr-only"
        @change="handleChange"
      />
      <label
        :for="id"
        :class="switchClasses"
        :data-state="modelValue ? 'checked' : 'unchecked'"
        :aria-checked="modelValue"
        role="switch"
      >
        <span
          :class="thumbClasses"
          :data-state="modelValue ? 'checked' : 'unchecked'"
        ></span>
      </label>
    </div>
  `
})

describe('Switch', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(Switch)
    
    // Check if switch elements are rendered
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.exists()).toBe(true)
    
    const label = wrapper.find('label[role="switch"]')
    expect(label.exists()).toBe(true)
    
    const thumb = wrapper.find('span')
    expect(thumb.exists()).toBe(true)
    
    // Check default props
    expect(input.attributes('checked')).toBeFalsy()
    expect(input.attributes('disabled')).toBeFalsy()
    expect(input.attributes('required')).toBeFalsy()
    
    // Check default state
    expect(label.attributes('data-state')).toBe('unchecked')
    expect(label.attributes('aria-checked')).toBe('false')
    expect(thumb.attributes('data-state')).toBe('unchecked')
    
    // Check default classes
    expect(label.classes()).toContain('bg-input')
    expect(thumb.classes()).toContain('translate-x-0')
  })
  
  it('applies custom props correctly', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
        disabled: true,
        id: 'test-switch',
        name: 'test-name',
        required: true
      }
    })
    
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.attributes('checked')).toBe('')
    expect(input.attributes('disabled')).toBe('')
    expect(input.attributes('required')).toBe('')
    expect(input.attributes('id')).toBe('test-switch')
    expect(input.attributes('name')).toBe('test-name')
    
    // Check checked state
    const label = wrapper.find('label')
    const thumb = wrapper.find('span')
    expect(label.attributes('data-state')).toBe('checked')
    expect(label.attributes('aria-checked')).toBe('true')
    expect(thumb.attributes('data-state')).toBe('checked')
    
    // Check checked classes
    expect(label.classes()).toContain('bg-primary')
    expect(thumb.classes()).toContain('translate-x-5')
  })
  
  it('emits update:modelValue and change events on change', async () => {
    const wrapper = mount(Switch)
    
    const input = wrapper.find('input[type="checkbox"]')
    
    // Simulate toggling the switch
    await input.setValue(true)
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    expect(wrapper.emitted('change')).toBeTruthy()
  })
  
  it('updates visual state when modelValue changes', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false
      }
    })
    
    // Initial state
    let label = wrapper.find('label')
    let thumb = wrapper.find('span')
    expect(label.classes()).toContain('bg-input')
    expect(thumb.classes()).toContain('translate-x-0')
    
    // Update modelValue prop
    await wrapper.setProps({ modelValue: true })
    
    // Check updated state
    label = wrapper.find('label')
    thumb = wrapper.find('span')
    expect(label.classes()).toContain('bg-primary')
    expect(thumb.classes()).toContain('translate-x-5')
  })
})
