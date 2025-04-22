<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const router = useRouter()

// Format date
const formattedDate = computed(() => {
  if (!props.project.created_at) return ''
  return new Date(props.project.created_at).toLocaleDateString()
})

// Navigate to project detail
const viewProject = () => {
  router.push(`/projects/${props.project.id}`)
}
</script>

<template>
  <div 
    class="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
    @click="viewProject"
  >
    <!-- Project Image -->
    <div class="aspect-video bg-muted relative overflow-hidden">
      <img 
        v-if="project.main_image_url" 
        :src="project.main_image_url" 
        :alt="project.title"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-muted">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground/50">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      </div>
    </div>
    
    <!-- Project Info -->
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-1 line-clamp-1">{{ project.title }}</h3>
      <p class="text-muted-foreground text-sm mb-2 line-clamp-2">{{ project.description }}</p>
      <div class="flex justify-between items-center text-xs text-muted-foreground">
        <span>{{ formattedDate }}</span>
        <span v-if="!project.published" class="px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400 rounded-full">
          Draft
        </span>
      </div>
    </div>
  </div>
</template>
