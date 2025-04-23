<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string | undefined
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectedIcon = ref(props.modelValue || '')

watch(() => props.modelValue, (newValue) => {
  selectedIcon.value = newValue || ''
})

const icons = [
  { name: 'home', label: 'Home' },
  { name: 'info', label: 'Info' },
  { name: 'user', label: 'User' },
  { name: 'building', label: 'Building' },
  { name: 'folder', label: 'Folder' },
  { name: 'file', label: 'File' },
  { name: 'pen-tool', label: 'Pen Tool' },
  { name: 'award', label: 'Award' },
  { name: 'book-open', label: 'Book Open' },
  { name: 'mail', label: 'Mail' },
  { name: 'tag', label: 'Tag' },
  { name: 'settings', label: 'Settings' },
  { name: 'users', label: 'Users' },
  { name: 'plus-circle', label: 'Plus Circle' },
  { name: 'dashboard', label: 'Dashboard' },
  { name: 'image', label: 'Image' },
  { name: 'layout', label: 'Layout' },
  { name: 'menu', label: 'Menu' },
  { name: 'globe', label: 'Globe' },
  { name: 'map', label: 'Map' },
  { name: 'calendar', label: 'Calendar' },
  { name: 'clock', label: 'Clock' },
  { name: 'heart', label: 'Heart' },
  { name: 'star', label: 'Star' },
  { name: 'phone', label: 'Phone' },
  { name: 'link', label: 'Link' },
  { name: 'external-link', label: 'External Link' },
  { name: 'eye', label: 'Eye' },
  { name: 'search', label: 'Search' },
  { name: 'filter', label: 'Filter' },
  { name: 'edit', label: 'Edit' },
  { name: 'trash', label: 'Trash' },
  { name: 'check', label: 'Check' },
  { name: 'x', label: 'X' },
  { name: 'alert-circle', label: 'Alert Circle' },
  { name: 'help-circle', label: 'Help Circle' },
  { name: 'chevron-down', label: 'Chevron Down' },
  { name: 'chevron-up', label: 'Chevron Up' },
  { name: 'chevron-left', label: 'Chevron Left' },
  { name: 'chevron-right', label: 'Chevron Right' },
  { name: 'arrow-up', label: 'Arrow Up' },
  { name: 'arrow-down', label: 'Arrow Down' },
  { name: 'arrow-left', label: 'Arrow Left' },
  { name: 'arrow-right', label: 'Arrow Right' },
]

function selectIcon(iconName: string) {
  selectedIcon.value = iconName
  emit('update:modelValue', iconName)
}

function clearIcon() {
  selectedIcon.value = ''
  emit('update:modelValue', '')
}
</script>

<template>
  <div>
    <div class="flex items-center mb-2">
      <label class="text-sm font-medium mr-2">Icon:</label>
      <div v-if="selectedIcon" class="flex items-center bg-muted rounded-md px-2 py-1">
        <span class="mr-2">{{ icons.find(i => i.name === selectedIcon)?.label || selectedIcon }}</span>
        <button 
          type="button" 
          class="text-muted-foreground hover:text-destructive"
          @click="clearIcon"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <span v-else class="text-muted-foreground text-sm">No icon selected</span>
    </div>
    
    <div class="grid grid-cols-6 gap-2 max-h-60 overflow-y-auto p-2 border rounded-md">
      <button
        v-for="icon in icons"
        :key="icon.name"
        type="button"
        class="flex flex-col items-center justify-center p-2 rounded-md hover:bg-muted transition-colors"
        :class="{ 'bg-muted': selectedIcon === icon.name }"
        @click="selectIcon(icon.name)"
      >
        <div class="h-8 w-8 flex items-center justify-center">
          <!-- Home icon -->
          <svg v-if="icon.name === 'home'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          
          <!-- Info icon -->
          <svg v-else-if="icon.name === 'info'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          
          <!-- User icon -->
          <svg v-else-if="icon.name === 'user'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          
          <!-- Building icon -->
          <svg v-else-if="icon.name === 'building'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="6" x2="12.01" y2="6"></line>
            <line x1="12" y1="10" x2="12.01" y2="10"></line>
            <line x1="12" y1="14" x2="12.01" y2="14"></line>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
          
          <!-- Folder icon -->
          <svg v-else-if="icon.name === 'folder'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          
          <!-- File icon -->
          <svg v-else-if="icon.name === 'file'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          
          <!-- Pen Tool icon -->
          <svg v-else-if="icon.name === 'pen-tool'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 19 7-7 3 3-7 7-3-3z"></path>
            <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
            <path d="m2 2 7.586 7.586"></path>
            <circle cx="11" cy="11" r="2"></circle>
          </svg>
          
          <!-- Award icon -->
          <svg v-else-if="icon.name === 'award'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
          
          <!-- Book Open icon -->
          <svg v-else-if="icon.name === 'book-open'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          
          <!-- Mail icon -->
          <svg v-else-if="icon.name === 'mail'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          
          <!-- Tag icon -->
          <svg v-else-if="icon.name === 'tag'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
            <path d="M7 7h.01"></path>
          </svg>
          
          <!-- Settings icon -->
          <svg v-else-if="icon.name === 'settings'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          
          <!-- Users icon -->
          <svg v-else-if="icon.name === 'users'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          
          <!-- Plus Circle icon -->
          <svg v-else-if="icon.name === 'plus-circle'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 12h8"></path>
            <path d="M12 8v8"></path>
          </svg>
          
          <!-- Dashboard icon -->
          <svg v-else-if="icon.name === 'dashboard'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1"></rect>
            <rect width="7" height="5" x="14" y="3" rx="1"></rect>
            <rect width="7" height="9" x="14" y="12" rx="1"></rect>
            <rect width="7" height="5" x="3" y="16" rx="1"></rect>
          </svg>
          
          <!-- Default for other icons -->
          <span v-else class="text-xs">{{ icon.name }}</span>
        </div>
        <span class="text-xs mt-1">{{ icon.label }}</span>
      </button>
    </div>
  </div>
</template>
