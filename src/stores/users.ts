import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export type UserRole = 'admin' | 'editor' | 'author'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  created_at: string
  updated_at: string
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref('')

  // Get all users
  async function fetchUsers() {
    loading.value = true
    error.value = ''
    
    try {
      const response = await axios.get('/api/users')
      users.value = response.data
      return users.value
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch users'
      return []
    } finally {
      loading.value = false
    }
  }

  // Get a single user by ID
  async function fetchUserById(id: string) {
    loading.value = true
    error.value = ''
    
    try {
      const response = await axios.get(`/api/users/${id}`)
      currentUser.value = response.data
      return currentUser.value
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch user'
      return null
    } finally {
      loading.value = false
    }
  }

  // Create a new user (admin only)
  async function createUser(userData: Partial<User> & { password: string }) {
    loading.value = true
    error.value = ''
    
    try {
      const response = await axios.post('/api/users', userData)
      users.value.push(response.data)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to create user'
      return null
    } finally {
      loading.value = false
    }
  }

  // Update a user (admin only)
  async function updateUser(id: string, userData: Partial<User> & { password?: string }) {
    loading.value = true
    error.value = ''
    
    try {
      const response = await axios.put(`/api/users/${id}`, userData)
      
      // Update the user in the users array
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = response.data
      }
      
      // Update currentUser if it's the same user
      if (currentUser.value?.id === id) {
        currentUser.value = response.data
      }
      
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to update user'
      return null
    } finally {
      loading.value = false
    }
  }

  // Delete a user (admin only)
  async function deleteUser(id: string) {
    loading.value = true
    error.value = ''
    
    try {
      await axios.delete(`/api/users/${id}`)
      
      // Remove the user from the users array
      users.value = users.value.filter(u => u.id !== id)
      
      // Clear currentUser if it's the same user
      if (currentUser.value?.id === id) {
        currentUser.value = null
      }
      
      return true
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to delete user'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    currentUser,
    loading,
    error,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser
  }
})
