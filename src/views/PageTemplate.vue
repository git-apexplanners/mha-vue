<script setup lang="ts">
// Define props for the page
defineProps<{
  title?: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="container py-12">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">{{ title || 'Page Title' }}</h1>
      <p v-if="subtitle" class="text-xl text-muted-foreground mb-8">{{ subtitle }}</p>
      
      <div class="prose prose-lg max-w-none">
        <slot>
          <!-- Default content if no slot content is provided -->
          <p>This is a placeholder content for this page. Replace this with actual content.</p>
          <p>You can add more content, images, and other elements here.</p>
        </slot>
      </div>
    </div>
  </div>
</template>
