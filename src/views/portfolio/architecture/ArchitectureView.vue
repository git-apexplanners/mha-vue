<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNavigation } from '@/composables/useNavigation';

const router = useRouter();
const { navigationItems } = useNavigation();

// Find the Architecture subcategory and its children
const portfolioItem = navigationItems.value.find(item => item.name === 'Portfolio');
const architectureCategory = ref(portfolioItem?.children?.find(item => item.name === 'Architecture'));
const architectureSubcategories = ref(architectureCategory.value?.children || []);

// Navigate to a subcategory
const navigateToSubcategory = (href: string | undefined) => {
  if (href) {
    router.push(href);
  }
};
</script>

<template>
  <div class="container py-12">
    <div class="mb-8">
      <router-link to="/portfolio" class="text-primary hover:underline flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Back to Portfolio
      </router-link>
      <h1 class="text-4xl font-bold mb-4">Architecture</h1>
      <p class="text-xl text-muted-foreground max-w-3xl">
        Our architectural projects showcase our commitment to innovative design, functionality, and sustainability.
      </p>
    </div>

    <!-- Architecture Subcategories -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="subcategory in architectureSubcategories" :key="subcategory.name" 
           class="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
           @click="navigateToSubcategory(subcategory.href)">
        <div class="aspect-square bg-muted relative">
          <!-- Placeholder for subcategory image -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-muted-foreground">{{ subcategory.name }} Image</span>
          </div>
        </div>
        <div class="p-4">
          <h2 class="text-xl font-bold mb-2">{{ subcategory.name }}</h2>
          <p class="text-sm text-muted-foreground">
            {{ subcategory.children ? `${subcategory.children.length} projects` : 'View projects' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Featured Architecture Projects -->
    <div class="mt-16">
      <h2 class="text-2xl font-bold mb-6">Featured Architecture Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Placeholder for featured projects -->
        <div v-for="i in 3" :key="i" class="bg-card rounded-lg overflow-hidden shadow-sm">
          <div class="aspect-video bg-muted relative">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-muted-foreground">Project Image {{ i }}</span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-bold mb-1">Featured Project {{ i }}</h3>
            <p class="text-sm text-muted-foreground mb-2">Location, Year</p>
            <p class="text-sm">A brief description of this featured architectural project.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
