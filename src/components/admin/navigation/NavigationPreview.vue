<script setup lang="ts">
import { NavItem } from '@/types/navigation'

defineProps<{
  items: NavItem[]
  level?: number
}>()
</script>

<template>
  <ul :class="{'pl-4': level && level > 0, 'space-y-1': true}">
    <li v-for="item in items" :key="item.id" class="relative">
      <div class="flex items-center py-2 px-3 rounded-md" :class="{'bg-muted': item.children && item.children.length}">
        <span v-if="item.icon" class="mr-2 text-muted-foreground">
          <svg v-if="item.icon === 'home'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <svg v-else-if="item.icon === 'info'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <svg v-else-if="item.icon === 'building'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="6" x2="12.01" y2="6"></line>
            <line x1="12" y1="10" x2="12.01" y2="10"></line>
            <line x1="12" y1="14" x2="12.01" y2="14"></line>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
          <svg v-else-if="item.icon === 'folder'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          <svg v-else-if="item.icon === 'pen-tool'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 19 7-7 3 3-7 7-3-3z"></path>
            <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
            <path d="m2 2 7.586 7.586"></path>
            <circle cx="11" cy="11" r="2"></circle>
          </svg>
          <svg v-else-if="item.icon === 'award'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
          <svg v-else-if="item.icon === 'book-open'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <svg v-else-if="item.icon === 'mail'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          <span v-else class="text-xs">{{ item.icon }}</span>
        </span>
        <span class="font-medium">{{ item.name }}</span>
        <span v-if="item.href" class="ml-2 text-xs text-muted-foreground">{{ item.href }}</span>
      </div>
      <NavigationPreview
        v-if="item.children && item.children.length"
        :items="item.children"
        :level="(level || 0) + 1"
      />
    </li>
  </ul>
</template>
