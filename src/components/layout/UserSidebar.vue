<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Sidebar state - collapsed by default, expands on hover
const isExpanded = ref(false)

// Expose for testing
defineExpose({ isExpanded, authStore })

// Toggle sidebar expansion
const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value
}

// Auto-expand on hover
const handleMouseEnter = () => {
  isExpanded.value = true
}

const handleMouseLeave = () => {
  isExpanded.value = false
}

// For tracking open submenu items
const openItems = ref({})

// Toggle submenu
const toggleSubmenu = (itemName: string) => {
  openItems.value[itemName] = !openItems.value[itemName]
}

// Check if submenu is open
const isSubmenuOpen = (item: any) => {
  return openItems.value[item.name] || false
}

// User navigation items
const userNavigationItems = [
  { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
  { name: 'Projects', href: '/admin/projects', icon: 'folder' },
  { name: 'Pages', href: '/admin/pages', icon: 'file' },
  { name: 'Categories', href: '/admin/categories', icon: 'tag' },
]

// Add users section for admins
if (authStore.isAdmin) {
  userNavigationItems.push({ name: 'Users', href: '/admin/users', icon: 'users' })
}

// Sign out function
const signOut = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div
    class="h-screen sticky top-0 bg-card border-r transition-all duration-300 flex flex-col"
    :class="isExpanded ? 'w-60' : 'w-[72px]'"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-4">
      <h1 v-if="isExpanded" class="font-semibold text-lg">User Menu</h1>
      <button
        @click.stop="toggleSidebar"
        class="p-2 rounded-md hover:bg-muted"
        aria-label="Toggle sidebar"
      >
        <!-- Menu icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-2">
      <ul class="space-y-1">
        <li v-for="item in userNavigationItems" :key="item.name">
          <router-link
            :to="item.href"
            class="flex items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
            :class="{ 'bg-muted': $route.path === item.href || $route.path.startsWith(`${item.href}/`) }"
          >
            <!-- Icon -->
            <span class="flex h-6 w-6 items-center justify-center mr-2">
              <template v-if="item.icon === 'dashboard'">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
              </template>
              <template v-else-if="item.icon === 'folder'">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                </svg>
              </template>
              <template v-else-if="item.icon === 'file'">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </template>
              <template v-else-if="item.icon === 'tag'">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                  <path d="M7 7h.01" />
                </svg>
              </template>
              <template v-else-if="item.icon === 'users'">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </template>
            </span>
            <span v-if="isExpanded">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Sign Out Button -->
    <div class="p-2 border-t">
      <button
        @click="signOut"
        class="flex items-center w-full rounded-md px-3 py-2 text-sm transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <span class="flex h-6 w-6 items-center justify-center mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </span>
        <span v-if="isExpanded">Sign Out</span>
      </button>
    </div>
  </div>
</template>
