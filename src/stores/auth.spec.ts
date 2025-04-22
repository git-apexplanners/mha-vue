import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from './auth'
import axios from 'axios'

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    defaults: {
      headers: {
        common: {}
      }
    }
  }
}))

describe('Auth Store', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())

    // Reset mocks
    vi.resetAllMocks()

    // Clear localStorage
    localStorage.clear()
  })

  it('initializes with correct state', () => {
    const store = useAuthStore()

    expect(store.user).toBeNull()
    expect(store.token).toBe('')
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('sets token in localStorage when login is successful', async () => {
    // Mock successful login response
    axios.post.mockResolvedValue({
      data: {
        token: 'fake-token',
        user: { id: '1', name: 'Test User', email: 'test@example.com', role: 'admin' }
      }
    })

    const store = useAuthStore()

    // Login
    await store.login('test@example.com', 'password')

    // Check if token is set in localStorage
    expect(localStorage.getItem('token')).toBe('fake-token')

    // Check if store state is updated
    expect(store.token).toBe('fake-token')
    expect(store.user).toEqual({ id: '1', name: 'Test User', email: 'test@example.com', role: 'admin' })
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')

    // Check if axios header is set
    expect(axios.defaults.headers.common['Authorization']).toBe('Bearer fake-token')
  })

  it('handles login error', async () => {
    // Mock login error
    axios.post.mockRejectedValue({
      response: {
        data: {
          error: 'Invalid credentials'
        }
      }
    })

    const store = useAuthStore()

    // Login
    await store.login('test@example.com', 'wrong-password')

    // Check if store state is updated
    expect(store.token).toBe('')
    expect(store.user).toBeNull()
    expect(store.loading).toBe(false)
    expect(store.error).toBe('Invalid credentials')

    // Check if localStorage is not set
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('clears token and user when logout is called', async () => {
    // Set initial state
    const store = useAuthStore()
    store.token = 'fake-token'
    store.user = { id: '1', name: 'Test User', email: 'test@example.com', role: 'admin' }
    localStorage.setItem('token', 'fake-token')
    axios.defaults.headers.common['Authorization'] = 'Bearer fake-token'

    // Logout
    store.logout()

    // Check if store state is updated
    expect(store.token).toBe('')
    expect(store.user).toBeNull()

    // Check if localStorage is cleared
    expect(localStorage.getItem('token')).toBeNull()

    // Check if axios header is cleared
    expect(axios.defaults.headers.common['Authorization']).toBeUndefined()
  })

  it('loads token from localStorage on initialization', () => {
    // Set token in localStorage
    localStorage.setItem('token', 'fake-token')

    // Initialize store
    const store = useAuthStore()

    // Check if token is loaded from localStorage
    expect(store.token).toBe('fake-token')
  })

  it('fetches current user when getCurrentUser is called', async () => {
    // Mock successful user response
    axios.get.mockResolvedValue({
      data: { id: '1', name: 'Test User', email: 'test@example.com', role: 'admin' }
    })

    const store = useAuthStore()
    store.token = 'fake-token'

    // Get current user
    await store.getCurrentUser()

    // Check if axios was called with the correct endpoint
    expect(axios.get).toHaveBeenCalledWith('/api/auth/me')

    // Check if store state is updated
    expect(store.user).toEqual({ id: '1', name: 'Test User', email: 'test@example.com', role: 'admin' })
  })

  it('correctly checks if user is authenticated', () => {
    const store = useAuthStore()

    // Not authenticated initially
    expect(store.isAuthenticated()).toBe(false)

    // Set token
    store.token = 'fake-token'

    // Should be authenticated now
    expect(store.isAuthenticated()).toBe(true)
  })

  it('correctly checks if user has a specific role', () => {
    const store = useAuthStore()

    // No user initially
    expect(store.hasRole('admin')).toBe(false)

    // Set user with admin role
    store.user = { id: '1', name: 'Test User', email: 'test@example.com', role: 'admin' }

    // Should have admin role
    expect(store.hasRole('admin')).toBe(true)

    // Should not have editor role
    expect(store.hasRole('editor')).toBe(false)
  })
})
