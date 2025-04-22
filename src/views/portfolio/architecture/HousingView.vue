<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNavigation } from '@/composables/useNavigation';

const router = useRouter();
const { navigationItems } = useNavigation();

// Find the Housing subcategory and its children
const portfolioItem = navigationItems.value.find(item => item.name === 'Portfolio');
const architectureCategory = portfolioItem?.children?.find(item => item.name === 'Architecture');
const housingCategory = ref(architectureCategory?.children?.find(item => item.name === 'Housing'));
const housingSubcategories = ref(housingCategory.value?.children || []);

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
      <router-link to="/portfolio/architecture" class="text-primary hover:underline flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Back to Architecture
      </router-link>
      <h1 class="text-4xl font-bold mb-4">Housing Projects</h1>
      <p class="text-xl text-muted-foreground max-w-3xl">
        Our housing projects range from social housing developments to luxury residential complexes, all designed with a focus on community, sustainability, and quality of life.
      </p>
    </div>

    <!-- Housing Subcategories -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="subcategory in housingSubcategories" :key="subcategory.name" 
           class="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
           @click="navigateToSubcategory(subcategory.href)">
        <div class="aspect-square bg-muted relative">
          <!-- Placeholder for subcategory image -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-muted-foreground">{{ subcategory.name }} Housing Image</span>
          </div>
        </div>
        <div class="p-4">
          <h2 class="text-xl font-bold mb-2">{{ subcategory.name }}</h2>
          <p class="text-sm text-muted-foreground mb-3">
            Explore our {{ subcategory.name.toLowerCase() }} housing projects.
          </p>
          <button class="text-primary hover:underline text-sm flex items-center">
            View Projects
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Housing Approach Section -->
    <div class="mt-16 bg-secondary rounded-lg p-8">
      <h2 class="text-2xl font-bold mb-6">Our Approach to Housing Design</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p class="mb-4">
            At Michael Hart Architects, we believe that well-designed housing can transform communities and improve quality of life. Our approach to housing design is centered around creating homes that are not only functional and affordable but also beautiful, sustainable, and conducive to community building.
          </p>
          <p>
            Whether we're designing social housing, affordable housing, or market-rate developments, we apply the same level of care and attention to detail, ensuring that every project meets the highest standards of design excellence.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-3">Key Considerations</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <strong class="block">Community Integration</strong>
                <span class="text-sm text-muted-foreground">Creating housing that fosters a sense of community and connects with the surrounding neighborhood.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <strong class="block">Affordability & Efficiency</strong>
                <span class="text-sm text-muted-foreground">Designing cost-effective housing without compromising on quality or spatial experience.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <strong class="block">Sustainability</strong>
                <span class="text-sm text-muted-foreground">Incorporating environmentally responsible design principles and technologies.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <strong class="block">Adaptability</strong>
                <span class="text-sm text-muted-foreground">Creating flexible spaces that can adapt to changing needs over time.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
