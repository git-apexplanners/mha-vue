<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNavigation } from '@/composables/useNavigation';

const router = useRouter();
const { navigationItems } = useNavigation();

// Find the Urban Design subcategory and its children
const portfolioItem = navigationItems.value.find(item => item.name === 'Portfolio');
const urbanDesignCategory = ref(portfolioItem?.children?.find(item => item.name === 'Urban Design'));
const urbanDesignSubcategories = ref(urbanDesignCategory.value?.children || []);

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
      <h1 class="text-4xl font-bold mb-4">Urban Design</h1>
      <p class="text-xl text-muted-foreground max-w-3xl">
        Our urban design projects focus on creating vibrant, sustainable, and inclusive urban environments that enhance quality of life and foster community connections.
      </p>
    </div>

    <!-- Urban Design Subcategories -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="subcategory in urbanDesignSubcategories" :key="subcategory.name" 
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

    <!-- Urban Design Approach -->
    <div class="mt-16 bg-secondary rounded-lg p-8">
      <h2 class="text-2xl font-bold mb-6">Our Urban Design Approach</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p class="mb-4">
            At Michael Hart Architects, we believe that thoughtful urban design has the power to transform cities and improve the lives of their inhabitants. Our approach to urban design is rooted in a deep understanding of how people interact with their environment and with each other in urban spaces.
          </p>
          <p>
            We work at various scales, from neighborhood planning to city-wide strategies, always with a focus on creating places that are not only functional and beautiful but also socially inclusive, environmentally sustainable, and economically viable.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-3">Key Principles</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <div>
                <strong class="block">Human-Centered Design</strong>
                <span class="text-sm text-muted-foreground">Prioritizing the needs, comfort, and experience of people in urban spaces.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <div>
                <strong class="block">Connectivity & Accessibility</strong>
                <span class="text-sm text-muted-foreground">Creating well-connected urban networks that are accessible to all.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <div>
                <strong class="block">Mixed-Use Development</strong>
                <span class="text-sm text-muted-foreground">Promoting diverse, vibrant neighborhoods with a mix of uses and activities.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <div>
                <strong class="block">Environmental Sustainability</strong>
                <span class="text-sm text-muted-foreground">Designing urban environments that minimize resource consumption and environmental impact.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Featured Urban Design Projects -->
    <div class="mt-16">
      <h2 class="text-2xl font-bold mb-6">Featured Urban Design Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Placeholder for featured projects -->
        <div v-for="i in 3" :key="i" class="bg-card rounded-lg overflow-hidden shadow-sm">
          <div class="aspect-video bg-muted relative">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-muted-foreground">Urban Project Image {{ i }}</span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-bold mb-1">Urban Project {{ i }}</h3>
            <p class="text-sm text-muted-foreground mb-2">Location, Year</p>
            <p class="text-sm">A brief description of this featured urban design project.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
