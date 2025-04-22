<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePagesStore } from '@/stores/pages'

const route = useRoute()
const pagesStore = usePagesStore()

// State
const loading = ref(true)
const notFound = ref(false)

// Get the slug from the route
const slug = computed(() => route.params.slug as string)

// Load the page
const loadPage = async () => {
  loading.value = true
  notFound.value = false

  try {
    const page = await pagesStore.fetchPageBySlug(slug.value)

    if (!page) {
      notFound.value = true
    } else if (!page.published) {
      // If the page is not published, redirect to 404
      notFound.value = true
    } else {
      // Set meta tags
      document.title = page.meta_title || page.title

      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', page.meta_description || '')
      } else {
        const meta = document.createElement('meta')
        meta.name = 'description'
        meta.content = page.meta_description || ''
        document.head.appendChild(meta)
      }
    }
  } catch (error) {
    console.error('Error loading page:', error)
    notFound.value = true
  } finally {
    loading.value = false
  }
}

// Watch for route changes
watch(() => route.params.slug, () => {
  loadPage()
})

// Load the page on mount
onMounted(() => {
  loadPage()
})
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>

    <!-- Page Not Found -->
    <div v-else-if="notFound" class="text-center py-12">
      <h1 class="text-3xl font-bold mb-4">Page Not Found</h1>
      <p class="text-muted-foreground mb-6">
        The page you are looking for does not exist or is not published.
      </p>
      <router-link
        to="/"
        class="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Return to Home
      </router-link>
    </div>

    <!-- Page Content -->
    <div v-else-if="pagesStore.currentPage">
      <header class="mb-8">
        <h1 class="text-3xl font-bold">{{ pagesStore.currentPage.title }}</h1>
      </header>

      <!-- Render HTML content -->
      <div class="prose max-w-none" v-html="pagesStore.currentPage.content"></div>
    </div>
  </div>
</template>
