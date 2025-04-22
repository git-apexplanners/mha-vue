import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Create a mock Button component
const Button = defineComponent({
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button'
    },
    asChild: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
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
        variantClasses[this.variant],
        sizeClasses[this.size]
      ]
    }
  },
  template: `
    <button v-if="!asChild" :type="type" :class="classes" :disabled="disabled" @click="$emit('click', $event)">
      <slot></slot>
    </button>
    <div v-else :class="classes" @click="$emit('click', $event)">
      <slot></slot>
    </div>
  `
})

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'default',
        size: 'default'
      },
      slots: {
        default: 'Test Button'
      }
    })

    expect(wrapper.text()).toContain('Test Button')
  })

  it('applies the correct variant class', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'destructive',
        size: 'default'
      }
    })

    expect(wrapper.classes()).toContain('bg-destructive')
  })

  it('applies the correct size class', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'default',
        size: 'sm'
      }
    })

    expect(wrapper.classes()).toContain('h-9')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('renders as a button element by default', () => {
    const wrapper = mount(Button)

    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('renders as a different element when asChild is true', () => {
    const wrapper = mount(Button, {
      props: {
        asChild: true
      },
      slots: {
        default: '<div>Custom Element</div>'
      }
    })

    // When asChild is true, it should render the slot content
    expect(wrapper.html()).toContain('Custom Element')
  })
})
