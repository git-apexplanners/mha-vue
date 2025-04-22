<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNavigation } from '@/composables/useNavigation';

const router = useRouter();
const { navigationItems } = useNavigation();

// Find the Urban Regeneration subcategory and its children
const portfolioItem = navigationItems.value.find(item => item.name === 'Portfolio');
const urbanDesignCategory = portfolioItem?.children?.find(item => item.name === 'Urban Design');
const regenerationCategory = ref(urbanDesignCategory?.children?.find(item => item.name === 'Urban Regeneration'));
const regenerationSubcategories = ref(regenerationCategory.value?.children || []);

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
      <router-link to="/portfolio/urban-design" class="text-primary hover:underline flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Back to Urban Design
      </router-link>
      <h1 class="text-4xl font-bold mb-4">Urban Regeneration</h1>
      <p class="text-xl text-muted-foreground max-w-3xl mb-8">
        Our urban regeneration projects focus on revitalizing underutilized or declining urban areas through strategic interventions that create vibrant, sustainable, and inclusive communities.
      </p>
    </div>

    <!-- Urban Regeneration Subcategories -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="subcategory in regenerationSubcategories" :key="subcategory.name" 
           class="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
           @click="navigateToSubcategory(subcategory.href)">
        <div class="aspect-video bg-muted relative">
          <!-- Placeholder for subcategory image -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-muted-foreground">{{ subcategory.name }} Image</span>
          </div>
        </div>
        <div class="p-4">
          <h2 class="text-xl font-bold mb-2">{{ subcategory.name }}</h2>
          <p class="text-sm text-muted-foreground mb-3">
            Explore our {{ subcategory.name.toLowerCase() }} urban regeneration projects.
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

    <!-- Featured Regeneration Projects -->
    <div class="mt-16">
      <h2 class="text-2xl font-bold mb-6">Featured Urban Regeneration Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Project 1 -->
        <div class="bg-card rounded-lg overflow-hidden shadow-sm">
          <div class="aspect-video bg-muted relative">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-muted-foreground">Waterfront Revitalization Image</span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-bold mb-1">Waterfront Revitalization</h3>
            <p class="text-sm text-muted-foreground mb-2">Cape Town, 2022</p>
            <p class="text-sm">Transformation of an underutilized industrial waterfront into a mixed-use district with public spaces, housing, and commercial activities.</p>
          </div>
        </div>
        
        <!-- Project 2 -->
        <div class="bg-card rounded-lg overflow-hidden shadow-sm">
          <div class="aspect-video bg-muted relative">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-muted-foreground">Downtown Renewal Image</span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-bold mb-1">Downtown Renewal</h3>
            <p class="text-sm text-muted-foreground mb-2">Johannesburg, 2021</p>
            <p class="text-sm">Comprehensive strategy for revitalizing a downtown area through adaptive reuse of historic buildings, public realm improvements, and economic development initiatives.</p>
          </div>
        </div>
        
        <!-- Project 3 -->
        <div class="bg-card rounded-lg overflow-hidden shadow-sm">
          <div class="aspect-video bg-muted relative">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-muted-foreground">Transit-Oriented Development Image</span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-bold mb-1">Transit-Oriented Development</h3>
            <p class="text-sm text-muted-foreground mb-2">Pretoria, 2020</p>
            <p class="text-sm">Creation of a vibrant, mixed-use neighborhood around a transit hub, promoting sustainable mobility and compact urban development.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Urban Regeneration Approach -->
    <div class="mt-16 bg-secondary rounded-lg p-8">
      <h2 class="text-2xl font-bold mb-6">Our Urban Regeneration Approach</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p class="mb-4">
            At Michael Hart Architects, we approach urban regeneration as a multifaceted process that addresses not only the physical aspects of urban environments but also their social, economic, and environmental dimensions. We believe that successful regeneration must be inclusive, sustainable, and responsive to local context and community needs.
          </p>
          <p>
            Our projects range from the revitalization of historic districts to the transformation of post-industrial areas, always with a focus on creating places that are vibrant, resilient, and equitable.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-3">Key Strategies</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <div>
                <strong class="block">Mixed-Use Development</strong>
                <span class="text-sm text-muted-foreground">Creating diverse, vibrant neighborhoods with a mix of uses and activities.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <div>
                <strong class="block">Adaptive Reuse</strong>
                <span class="text-sm text-muted-foreground">Repurposing existing buildings for new uses, preserving urban fabric and embodied energy.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <div>
                <strong class="block">Public Realm Enhancement</strong>
                <span class="text-sm text-muted-foreground">Improving streets, squares, parks, and other public spaces to support community life.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <div>
                <strong class="block">Community Engagement</strong>
                <span class="text-sm text-muted-foreground">Involving local residents and businesses in the regeneration process.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
