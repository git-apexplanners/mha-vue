<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNavigation } from '@/composables/useNavigation';

const router = useRouter();
const { navigationItems } = useNavigation();

// Find the Design Process item and its children
const designProcessItem = ref(navigationItems.value.find(item => item.name === 'Design Process'));
const designProcessCategories = ref(designProcessItem.value?.children || []);

// Navigate to a category
const navigateToCategory = (href: string | undefined) => {
  if (href) {
    router.push(href);
  }
};
</script>

<template>
  <div class="container py-12">
    <h1 class="text-4xl font-bold mb-6">Design Process</h1>
    <p class="text-xl text-muted-foreground mb-12 max-w-3xl">
      Explore our architectural design process, from initial concept to final construction, and learn how we approach different project types and contexts.
    </p>

    <!-- Design Process Categories -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="category in designProcessCategories" :key="category.name" 
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
            Learn about our approach to {{ category.name.toLowerCase() }} design and development.
          </p>
          <button class="text-primary hover:underline flex items-center">
            Explore
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- General Design Process Section -->
    <div class="mt-16">
      <h2 class="text-3xl font-bold mb-8">Our Design Process</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h3 class="text-2xl font-bold mb-4">1. Discovery</h3>
          <p class="mb-4">
            We begin every project with a thorough discovery phase, where we listen to your needs, aspirations, and constraints. This involves site visits, stakeholder interviews, and research to understand the context and requirements fully.
          </p>
          <p>
            During this phase, we establish project goals, budget parameters, and timeline expectations to ensure alignment from the start.
          </p>
        </div>
        <div class="bg-muted rounded-lg aspect-video flex items-center justify-center">
          <span class="text-muted-foreground">Discovery Phase Image</span>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div class="order-2 md:order-1 bg-muted rounded-lg aspect-video flex items-center justify-center">
          <span class="text-muted-foreground">Concept Development Image</span>
        </div>
        <div class="order-1 md:order-2">
          <h3 class="text-2xl font-bold mb-4">2. Concept Development</h3>
          <p class="mb-4">
            Based on our discovery findings, we develop initial design concepts that respond to your brief and the site context. We explore multiple approaches and present them through sketches, diagrams, and 3D visualizations.
          </p>
          <p>
            This iterative process involves close collaboration with you to refine the concept until it perfectly captures your vision while addressing practical considerations.
          </p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h3 class="text-2xl font-bold mb-4">3. Design Development</h3>
          <p class="mb-4">
            Once the concept is approved, we develop it into a detailed design, resolving technical aspects such as materials, systems, and specifications. We coordinate with engineers and other consultants to ensure all elements work together seamlessly.
          </p>
          <p>
            During this phase, we refine the design through detailed drawings, models, and material samples, allowing you to visualize the final outcome with increasing clarity.
          </p>
        </div>
        <div class="bg-muted rounded-lg aspect-video flex items-center justify-center">
          <span class="text-muted-foreground">Design Development Image</span>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div class="order-2 md:order-1 bg-muted rounded-lg aspect-video flex items-center justify-center">
          <span class="text-muted-foreground">Documentation Image</span>
        </div>
        <div class="order-1 md:order-2">
          <h3 class="text-2xl font-bold mb-4">4. Documentation</h3>
          <p class="mb-4">
            We prepare comprehensive documentation for planning approval, building permits, and construction. This includes detailed drawings, specifications, and other technical documents that communicate the design intent clearly to authorities and builders.
          </p>
          <p>
            Our thorough documentation helps prevent misunderstandings and ensures that the project can be built as designed, within budget and on schedule.
          </p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 class="text-2xl font-bold mb-4">5. Construction</h3>
          <p class="mb-4">
            During construction, we provide ongoing support to ensure the design intent is realized. We conduct regular site visits, review shop drawings and samples, and address any issues that arise during the building process.
          </p>
          <p>
            Our involvement throughout construction helps maintain design quality and resolve challenges efficiently, resulting in a finished project that fulfills your vision and meets the highest standards of design excellence.
          </p>
        </div>
        <div class="bg-muted rounded-lg aspect-video flex items-center justify-center">
          <span class="text-muted-foreground">Construction Phase Image</span>
        </div>
      </div>
    </div>
  </div>
</template>
