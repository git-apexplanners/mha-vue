<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Sidebar state - collapsed by default, expands on hover
const isExpanded = ref(false)

// For tracking open submenu items
const openItems = ref({})

// Expose for testing
defineExpose({ isExpanded, openItems, authStore })

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

// Admin navigation items
const adminNavigationItems = [
  { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
  { name: 'Projects', href: '/admin/projects', icon: 'folder' },
  { name: 'Pages', href: '/admin/pages', icon: 'file' },
  { name: 'Categories', href: '/admin/categories', icon: 'tag' },
  { name: 'Navigation Menu', href: '/admin/navigation', icon: 'menu' },
  {
    name: 'Quick Create',
    icon: 'plus-circle',
    children: [
      { name: 'New Project', href: '/admin/projects/new' },
      { name: 'New Page', href: '/admin/pages/new' },
      { name: 'New Category', href: '/admin/categories/new' },
    ]
  },
]

// Add users section for admins
if (authStore.isAdmin) {
  adminNavigationItems.push({ name: 'Users', href: '/admin/users', icon: 'users' })
}

// Toggle submenu
const toggleSubmenu = (itemName: string) => {
  openItems.value[itemName] = !openItems.value[itemName]
}

// Check if submenu is open
const isSubmenuOpen = (item: any) => {
  return openItems.value[item.name] || false
}

// Sign out function
const signOut = () => {
  authStore.logout()
  router.push('/login')
}

// User info
const userInfo = computed(() => {
  return authStore.user || { name: 'User', role: 'guest' }
})
</script>

<template>
  <div
    class="h-screen sticky top-0 right-0 bg-card border-l transition-all duration-300 flex flex-col"
    :class="isExpanded ? 'w-60' : 'w-[72px]'"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-4">
      <h1 v-if="isExpanded" class="font-semibold text-lg">Admin</h1>
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

    <!-- User Info -->
    <div v-if="isExpanded" class="px-4 py-2 border-b">
      <div class="text-sm font-medium">{{ userInfo.name }}</div>
      <div class="text-xs text-muted-foreground capitalize">{{ userInfo.role }}</div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-2">
      <ul class="space-y-1">
        <li v-for="item in adminNavigationItems" :key="item.name">
          <!-- Menu item with link -->
          <template v-if="item.href && !item.children?.length">
            <router-link
              :to="item.href"
              class="flex items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              <span v-if="isExpanded">{{ item.name }}</span>
            </router-link>
          </template>

          <!-- Menu item with submenu -->
          <template v-else-if="item.children?.length">
            <div>
              <!-- Parent item -->
              <button
                @click="toggleSubmenu(item.name)"
                class="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
              >
                <div class="flex items-center">
                  <span v-if="isExpanded">{{ item.name }}</span>
                </div>
              </button>

              <!-- Submenu -->
              <div v-if="isExpanded && isSubmenuOpen(item)" class="mt-1 ml-4 space-y-1">
                <router-link
                  v-for="child in item.children"
                  :key="child.name"
                  :to="child.href"
                  class="flex items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                >
                  {{ child.name }}
                </router-link>
              </div>
            </div>
          </template>
        </li>
      </ul>
    </nav>

    <!-- Sign Out Button -->
    <div class="p-2 border-t">
      <button
        @click="signOut"
        class="flex items-center w-full rounded-md px-3 py-2 text-sm transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <span v-if="isExpanded">Sign Out</span>
      </button>
    </div>
  </div>
</template>
