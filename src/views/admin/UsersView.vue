<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'
import { toastService } from '@/composables/useToast'
import type { User } from '@/stores/users'

const router = useRouter()
const usersStore = useUsersStore()
const authStore = useAuthStore()

// State
const loading = ref(true)
const isDeleteModalOpen = ref(false)
const userToDelete = ref<User | null>(null)

// Load users
onMounted(async () => {
  try {
    await usersStore.fetchUsers()
  } catch (error) {
    console.error('Error fetching users:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to load users. Please try again.'
    })
  } finally {
    loading.value = false
  }
})

// Navigate to create new user
const createNewUser = () => {
  router.push('/admin/users/new')
}

// Navigate to edit user
const editUser = (id: string) => {
  router.push(`/admin/users/${id}`)
}

// Confirm delete
const confirmDelete = (user: User) => {
  // Check if trying to delete the current user
  if (user.id === authStore.user?.id) {
    toastService.error({
      title: 'Error',
      description: 'You cannot delete your own account.'
    })
    return
  }
  
  userToDelete.value = user
  isDeleteModalOpen.value = true
}

// Cancel delete
const cancelDelete = () => {
  userToDelete.value = null
  isDeleteModalOpen.value = false
}

// Delete user
const deleteUser = async () => {
  if (!userToDelete.value) return
  
  try {
    const success = await usersStore.deleteUser(userToDelete.value.id)
    
    if (success) {
      toastService.success({
        title: 'Success',
        description: `User "${userToDelete.value.name}" has been deleted.`
      })
    } else {
      throw new Error('Failed to delete user')
    }
  } catch (error) {
    console.error('Error deleting user:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to delete user. Please try again.'
    })
  } finally {
    cancelDelete()
  }
}

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

// Get role badge class
const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case 'admin':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400'
    case 'editor':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400'
    case 'author':
      return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400'
  }
}
</script>

<template>
  <div>
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold">Users</h1>
        <p class="text-muted-foreground">Manage user accounts</p>
      </div>
      <button
        @click="createNewUser"
        class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
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
          class="h-4 w-4 mr-2"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        New User
      </button>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>

    <!-- No Users -->
    <div v-else-if="usersStore.users.length === 0" class="text-center py-12">
      <h3 class="text-xl font-bold mb-2">No users found</h3>
      <p class="text-muted-foreground mb-4">Create your first user to get started</p>
      <button
        @click="createNewUser"
        class="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
      >
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
          class="h-4 w-4 mr-2"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        New User
      </button>
    </div>

    <!-- Users Table -->
    <div v-else class="bg-card rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4 font-medium">Name</th>
              <th class="text-left py-3 px-4 font-medium">Email</th>
              <th class="text-left py-3 px-4 font-medium">Role</th>
              <th class="text-left py-3 px-4 font-medium">Created</th>
              <th class="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in usersStore.users" :key="user.id" class="border-b">
              <td class="py-3 px-4">{{ user.name }}</td>
              <td class="py-3 px-4">{{ user.email }}</td>
              <td class="py-3 px-4">
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getRoleBadgeClass(user.role)
                  ]"
                >
                  {{ user.role.charAt(0).toUpperCase() + user.role.slice(1) }}
                </span>
              </td>
              <td class="py-3 px-4">{{ formatDate(user.created_at) }}</td>
              <td class="py-3 px-4 text-right">
                <div class="flex justify-end gap-2">
                  <button @click="editUser(user.id)" class="text-primary hover:text-primary/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                      <path d="m15 5 4 4"></path>
                    </svg>
                  </button>
                  <button @click="confirmDelete(user)" class="text-destructive hover:text-destructive/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 bg-background/80 flex items-center justify-center">
      <div class="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-2">Delete User</h3>
        <p class="mb-4">
          Are you sure you want to delete the user "{{ userToDelete?.name }}"? This action cannot be undone.
        </p>
        <div class="flex justify-end gap-2">
          <button
            @click="cancelDelete"
            class="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            Cancel
          </button>
          <button
            @click="deleteUser"
            class="px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
