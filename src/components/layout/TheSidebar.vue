<script>
import { useNavigation } from '../../composables/useNavigation'
import { ref } from 'vue'

export default {
  name: 'TheSidebar',
  setup() {
    // Get navigation items and helper functions
    const { navigationItems, isActive, isActiveParent } = useNavigation()

    // Sidebar state - collapsed by default, expands on hover
    const isExpanded = ref(false)

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
    const toggleSubmenu = (itemName) => {
      openItems.value[itemName] = !openItems.value[itemName]
    }

    // Check if submenu should be open (if active or manually opened)
    const isSubmenuOpen = (item) => {
      return openItems.value[item.name] || isActiveParent(item)
    }

    return {
      navigationItems,
      isActive,
      isActiveParent,
      isExpanded,
      toggleSidebar,
      handleMouseEnter,
      handleMouseLeave,
      openItems,
      toggleSubmenu,
      isSubmenuOpen
    }
  }
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
      <h1 v-if="isExpanded" class="font-semibold text-lg">Michael Hart</h1>
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
        <li v-for="item in navigationItems" :key="item.name">
            <!-- Menu item with link -->
            <template v-if="item.href && !item.children?.length">
              <router-link
                :to="item.href"
                class="flex items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                :class="{ 'bg-muted': isActive(item.href) }"
              >
                <!-- Icon -->
                <span class="flex h-6 w-6 items-center justify-center mr-2">
                  <template v-if="item.icon === 'home'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </template>
                  <template v-else-if="item.icon === 'info'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </template>
                  <template v-else-if="item.icon === 'user'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </template>
                  <template v-else-if="item.icon === 'building'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                      <path d="M9 22v-4h6v4" />
                      <path d="M8 6h.01" />
                      <path d="M16 6h.01" />
                      <path d="M8 10h.01" />
                      <path d="M16 10h.01" />
                      <path d="M8 14h.01" />
                      <path d="M16 14h.01" />
                    </svg>
                  </template>
                  <template v-else-if="item.icon === 'folder'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                    </svg>
                  </template>
                  <template v-else-if="item.icon === 'pen-tool'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m12 19 7-7 3 3-7 7-3-3z" />
                      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                      <path d="m2 2 7.586 7.586" />
                      <circle cx="11" cy="11" r="2" />
                    </svg>
                  </template>
                  <template v-else-if="item.icon === 'award'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                  </template>
                  <template v-else-if="item.icon === 'book-open'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </template>
                  <template v-else-if="item.icon === 'mail'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </template>
                </span>
                <!-- Text (only shown when expanded) -->
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
                  :class="{ 'bg-muted': isActiveParent(item) }"
                >
                  <div class="flex items-center">
                    <!-- Icon -->
                    <span class="flex h-6 w-6 items-center justify-center mr-2">
                      <template v-if="item.icon === 'home'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      </template>
                      <template v-else-if="item.icon === 'info'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                      </template>
                      <template v-else-if="item.icon === 'user'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </template>
                      <template v-else-if="item.icon === 'building'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                          <path d="M9 22v-4h6v4" />
                          <path d="M8 6h.01" />
                          <path d="M16 6h.01" />
                          <path d="M8 10h.01" />
                          <path d="M16 10h.01" />
                          <path d="M8 14h.01" />
                          <path d="M16 14h.01" />
                        </svg>
                      </template>
                      <template v-else-if="item.icon === 'folder'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                        </svg>
                      </template>
                      <template v-else-if="item.icon === 'pen-tool'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="m12 19 7-7 3 3-7 7-3-3z" />
                          <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                          <path d="m2 2 7.586 7.586" />
                          <circle cx="11" cy="11" r="2" />
                        </svg>
                      </template>
                      <template v-else-if="item.icon === 'award'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="8" r="7" />
                          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                        </svg>
                      </template>
                      <template v-else-if="item.icon === 'book-open'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                      </template>
                      <template v-else-if="item.icon === 'mail'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </template>
                    </span>
                    <!-- Text (only shown when expanded) -->
                    <span v-if="isExpanded">{{ item.name }}</span>
                  </div>
                  <!-- Chevron (only shown when expanded) -->
                  <span v-if="isExpanded" class="ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      :class="{ 'rotate-90': isSubmenuOpen(item) }"
                      class="transition-transform"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                </button>

                <!-- Submenu -->
                <div v-if="isExpanded && isSubmenuOpen(item)" class="mt-1 ml-4 space-y-1">
                  <div v-for="child in item.children" :key="child.name">
                    <!-- Child with link -->
                    <template v-if="child.href && !child.children?.length">
                      <router-link
                        :to="child.href"
                        class="flex items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                        :class="{ 'bg-muted': isActive(child.href) }"
                      >
                        {{ child.name }}
                      </router-link>
                    </template>
                    <!-- Child with submenu -->
                    <template v-else-if="child.children?.length">
                      <div>
                        <button
                          @click="toggleSubmenu(child.name)"
                          class="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                          :class="{ 'bg-muted': isActiveParent(child) }"
                        >
                          <span>{{ child.name }}</span>
                          <span class="ml-auto">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              :class="{ 'rotate-90': isSubmenuOpen(child) }"
                              class="transition-transform"
                            >
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          </span>
                        </button>
                        <!-- Nested submenu -->
                        <div v-if="isSubmenuOpen(child)" class="mt-1 ml-4 space-y-1">
                          <div v-for="grandchild in child.children" :key="grandchild.name">
                            <router-link
                              :to="grandchild.href"
                              class="flex items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                              :class="{ 'bg-muted': isActive(grandchild.href) }"
                            >
                              {{ grandchild.name }}
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </template>
          </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t">
      <router-link
        to="/admin"
        class="flex items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted w-full"
        :class="{ 'bg-muted': isActive('/admin') }"
      >
        <span class="flex h-6 w-6 items-center justify-center mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </span>
        <span v-if="isExpanded">Admin Dashboard</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styling here */
</style>
