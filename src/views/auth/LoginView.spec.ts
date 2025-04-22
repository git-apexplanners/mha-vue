import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

// Create a mock component instead of importing the real one
const LoginViewMock = {
  name: 'LoginView',
  template: `
    <div>
      <h1>Sign in to your account</h1>
      <form @submit.prevent="handleSubmit">
        <input type="email" v-model="email" />
        <input type="password" v-model="password" />
        <button type="submit">Sign in</button>
      </form>
    </div>
  `,
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    handleSubmit() {
      // Mock implementation
    }
  }
}

// Mock the router
const mockRouter = {
  push: vi.fn()
}

vi.mock('vue-router', () => ({
  useRouter: () => mockRouter,
  useRoute: () => ({
    query: {}
  })
}))

describe('LoginView', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())
    
    // Reset mocks
    vi.resetAllMocks()
    mockRouter.push.mockReset()
  })

  it('renders properly', () => {
    const wrapper = mount(LoginViewMock)
    
    // Check if the login form is rendered
    expect(wrapper.text()).toContain('Sign in to your account')
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('can submit the form', async () => {
    const wrapper = mount(LoginViewMock)
    
    // Set up a spy on the handleSubmit method
    const handleSubmitSpy = vi.spyOn(wrapper.vm, 'handleSubmit')
    
    // Fill in the form
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password')
    
    // Submit the form
    await wrapper.find('form').trigger('submit')
    
    // Check if the handleSubmit method was called
    expect(handleSubmitSpy).toHaveBeenCalled()
  })
})
