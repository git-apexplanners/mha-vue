<script setup lang="ts">
import PageTemplate from '@/views/PageTemplate.vue';
</script>

<template>
  <PageTemplate title="Residential Design Process" subtitle="Our approach to creating homes that reflect your lifestyle, aspirations, and connection to place">
    <div class="space-y-12">
      <section>
        <h2 class="text-2xl font-bold mb-4">A Personalized Approach</h2>
        <p class="mb-4">
          Designing a home is a deeply personal journey. Our residential design process is centered around understanding your unique lifestyle, preferences, and aspirations. We believe that the most successful homes are those that reflect the personalities and needs of the people who live in them.
        </p>
        <p>
          Whether we're designing a new home, renovating an existing one, or adding an extension, we take the time to listen and learn about how you live, what matters to you, and how your home can best support your life now and in the future.
        </p>
        
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-muted rounded-lg aspect-video flex items-center justify-center">
            <span class="text-muted-foreground">Client Consultation Image</span>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-3">Initial Consultation</h3>
            <p class="mb-3">
              Our process begins with an in-depth conversation about your vision, requirements, and budget. We discuss your lifestyle, family dynamics, aesthetic preferences, and how you want your home to feel and function.
            </p>
            <p>
              For renovation projects, we also assess your existing home, identifying what works well, what doesn't, and how we can transform the space to better meet your needs while respecting its character and history.
            </p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 class="text-2xl font-bold mb-4">Site and Context Analysis</h2>
        <p class="mb-6">
          Understanding the site and its context is essential to creating a home that feels connected to its surroundings and makes the most of its location. We conduct a thorough analysis of your site, considering factors such as:
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-card p-5 rounded-lg">
            <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-2">Natural Features</h3>
            <p class="text-sm text-muted-foreground">
              Topography, vegetation, views, climate, and natural light patterns that can inform the design.
            </p>
          </div>
          
          <div class="bg-card p-5 rounded-lg">
            <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-2">Built Context</h3>
            <p class="text-sm text-muted-foreground">
              Surrounding buildings, neighborhood character, and architectural heritage considerations.
            </p>
          </div>
          
          <div class="bg-card p-5 rounded-lg">
            <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-2">Regulatory Context</h3>
            <p class="text-sm text-muted-foreground">
              Zoning regulations, building codes, and other legal constraints that may affect the design.
            </p>
          </div>
        </div>
        
        <p>
          This analysis helps us identify opportunities and constraints that will inform the design, ensuring that your home responds thoughtfully to its environment and makes the most of its unique setting.
        </p>
      </section>
      
      <section>
        <h2 class="text-2xl font-bold mb-4">Concept Design</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p class="mb-4">
              Based on our understanding of your needs and the site, we develop initial design concepts that explore different approaches to organizing space, form, and experience. These concepts are presented through sketches, diagrams, and 3D visualizations that help you understand the spatial qualities and potential of each option.
            </p>
            <p>
              This is a collaborative and iterative process, where we work closely with you to refine the concept until it perfectly captures your vision while addressing practical considerations such as budget, construction feasibility, and regulatory requirements.
            </p>
          </div>
          <div class="bg-muted rounded-lg aspect-video flex items-center justify-center">
            <span class="text-muted-foreground">Concept Design Sketches</span>
          </div>
        </div>
        
        <div class="mt-8 bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Key Design Considerations</h3>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Spatial Flow:</strong> How rooms connect and relate to each other</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Light & Views:</strong> Maximizing natural light and capturing views</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Indoor-Outdoor Connection:</strong> Relationship between interior and exterior spaces</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Privacy & Openness:</strong> Balancing social and private spaces</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Materials & Textures:</strong> Creating atmosphere and character</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Sustainability:</strong> Energy efficiency and environmental responsibility</span>
            </li>
          </ul>
        </div>
      </section>
      
      <section>
        <h2 class="text-2xl font-bold mb-4">Design Development & Documentation</h2>
        <p class="mb-6">
          Once the concept is approved, we develop it into a detailed design, resolving technical aspects such as construction methods, materials, systems, and specifications. We coordinate with engineers and other consultants to ensure all elements work together seamlessly.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-card p-5 rounded-lg">
            <h3 class="text-lg font-bold mb-3">Detailed Design</h3>
            <ul class="space-y-2 text-sm">
              <li>• Floor plans and elevations</li>
              <li>• Interior elevations and sections</li>
              <li>• Material and finish selections</li>
              <li>• Lighting and electrical plans</li>
              <li>• Detailed 3D visualizations</li>
            </ul>
          </div>
          
          <div class="bg-card p-5 rounded-lg">
            <h3 class="text-lg font-bold mb-3">Technical Documentation</h3>
            <ul class="space-y-2 text-sm">
              <li>• Construction drawings</li>
              <li>• Specifications</li>
              <li>• Structural coordination</li>
              <li>• MEP coordination</li>
              <li>• Building permit documentation</li>
            </ul>
          </div>
          
          <div class="bg-card p-5 rounded-lg">
            <h3 class="text-lg font-bold mb-3">Construction Support</h3>
            <ul class="space-y-2 text-sm">
              <li>• Contractor selection assistance</li>
              <li>• Regular site visits</li>
              <li>• Shop drawing review</li>
              <li>• Material sample approval</li>
              <li>• Construction issue resolution</li>
            </ul>
          </div>
        </div>
        
        <p>
          Throughout this process, we maintain clear communication with you, ensuring that you understand the design decisions and are involved in key choices. Our goal is to create a home that not only meets your functional needs but also brings joy and inspiration to your daily life.
        </p>
      </section>
      
      <section>
        <h2 class="text-2xl font-bold mb-4">Featured Residential Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-card rounded-lg overflow-hidden">
            <div class="aspect-video bg-muted relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-muted-foreground">Clifftop Residence Image</span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="text-xl font-bold mb-2">Clifftop Residence</h3>
              <p class="text-sm text-muted-foreground mb-3">Cape Town, 2022</p>
              <p class="text-sm mb-4">
                A contemporary home perched on a dramatic coastal site, designed to maximize views while providing shelter from the elements. The design features a series of pavilions that step down the slope, with extensive glazing and outdoor living spaces.
              </p>
              <button class="text-primary hover:underline text-sm flex items-center">
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="bg-card rounded-lg overflow-hidden">
            <div class="aspect-video bg-muted relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-muted-foreground">Urban Townhouse Image</span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="text-xl font-bold mb-2">Urban Townhouse</h3>
              <p class="text-sm text-muted-foreground mb-3">Johannesburg, 2021</p>
              <p class="text-sm mb-4">
                A renovation and extension of a historic townhouse, creating a contemporary living environment while preserving the building's heritage character. The design features a light-filled central atrium and a modern rear extension that opens to a private garden.
              </p>
              <button class="text-primary hover:underline text-sm flex items-center">
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
</template>
