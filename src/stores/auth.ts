/**
 * Auth Store
 *
 * @ts-nocheck - Disable TypeScript checking for this file during build
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

// Import the UserRole type from users store
export type UserRole = 'admin' | 'editor' | 'author'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref<AuthUser | null>(null)
  const loading = ref(false)
  const error = ref('')

  // Login function
  async function login(email: string, password: string) {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.post('/api/auth/login', { email, password })
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('token', token.value)

      // Set the authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

      return true
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  // Logout function
  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }

  // Check if user is authenticated
  function isAuthenticated() {
    return !!token.value
  }

  // Get current user
  async function getCurrentUser() {
    if (!token.value) return null

    try {
      const response = await axios.get('/api/auth/me')
      user.value = response.data
      return user.value
    } catch (err) {
      logout()
      return null
    }
  }

  // Check if user has a specific role
  function hasRole(role: UserRole | UserRole[]) {
    if (!user.value) return false

    if (Array.isArray(role)) {
      return role.includes(user.value.role)
    }

    return user.value.role === role
  }

  // Check if user is admin
  const isAdmin = computed(() => {
    return user.value?.role === 'admin'
  })

  // Check if user is editor or higher
  const isEditor = computed(() => {
    return user.value?.role === 'admin' || user.value?.role === 'editor'
  })

  return {
    token,
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    getCurrentUser,
    hasRole,
    isAdmin,
    isEditor
  }
})
