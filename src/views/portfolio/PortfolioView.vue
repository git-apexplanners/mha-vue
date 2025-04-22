<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNavigation } from '@/composables/useNavigation';

const router = useRouter();
const { navigationItems } = useNavigation();

// Find the Portfolio item and its children
const portfolioItem = ref(navigationItems.value.find(item => item.name === 'Portfolio'));
const portfolioCategories = ref(portfolioItem.value?.children || []);

// Navigate to a category
const navigateToCategory = (href: string | undefined) => {
  if (href) {
    router.push(href);
  }
};
</script>

<template>
  <div class="container py-12">
    <h1 class="text-4xl font-bold mb-6">Portfolio</h1>
    <p class="text-xl text-muted-foreground mb-12 max-w-3xl">
      Explore our diverse portfolio of architectural projects, spanning residential, commercial, and urban design.
    </p>

    <!-- Portfolio Categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div v-for="category in portfolioCategories" :key="category.name" 
           class="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
           @click="navigateToCategory(category.href)">
        <div class="aspect-video bg-muted relative">
          <!-- Placeholder for category image -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-muted-foreground">{{ category.name }} Image</span>
          </div>
        </div>
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-2">{{ category.name }}</h2>
          <p class="text-muted-foreground mb-4">
            Explore our {{ category.name.toLowerCase() }} projects and designs.
          </p>
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">
              {{ category.children?.length || 0 }} subcategories
            </span>
            <button class="text-primary hover:underline flex items-center">
              View Projects
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
