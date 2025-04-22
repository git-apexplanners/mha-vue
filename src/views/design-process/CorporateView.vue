<script setup lang="ts">
import PageTemplate from '@/views/PageTemplate.vue';
</script>

<template>
  <PageTemplate title="Corporate Design Process" subtitle="Our approach to designing corporate spaces that balance functionality, brand identity, and employee well-being">
    <div class="space-y-12">
      <section>
        <h2 class="text-2xl font-bold mb-4">Understanding Corporate Needs</h2>
        <p class="mb-4">
          Our corporate design process begins with a deep dive into your organization's culture, workflow, and strategic objectives. We conduct stakeholder interviews, workplace surveys, and observational studies to understand how your space can best support your business goals and employee needs.
        </p>
        <p>
          This research-driven approach ensures that our designs are not just aesthetically pleasing but also functionally optimized for your specific organizational requirements.
        </p>
        
        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-card p-4 rounded-lg">
            <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-2">Stakeholder Engagement</h3>
            <p class="text-sm text-muted-foreground">
              Collaborative workshops and interviews with leadership, employees, and facilities management.
            </p>
          </div>
          
          <div class="bg-card p-4 rounded-lg">
            <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-2">Workplace Analysis</h3>
            <p class="text-sm text-muted-foreground">
              Detailed assessment of current space utilization, workflow patterns, and organizational structure.
            </p>
          </div>
          
          <div class="bg-card p-4 rounded-lg">
            <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-2">Brand Integration</h3>
            <p class="text-sm text-muted-foreground">
              Exploration of how your brand identity and values can be expressed through the physical environment.
            </p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 class="text-2xl font-bold mb-4">Strategic Space Planning</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p class="mb-4">
              Once we understand your needs, we develop strategic space plans that optimize layout, adjacencies, and circulation. We consider factors such as departmental relationships, privacy requirements, collaboration needs, and future growth.
            </p>
            <p>
              Our planning process balances efficiency with experience, creating spaces that not only maximize usable area but also support employee well-being, productivity, and engagement.
            </p>
          </div>
          <div class="bg-muted rounded-lg aspect-video flex items-center justify-center">
            <span class="text-muted-foreground">Space Planning Diagram</span>
          </div>
        </div>
        
        <div class="mt-8 bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Key Planning Considerations</h3>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Work Modes:</strong> Spaces for focused work, collaboration, learning, and socializing</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Technology Integration:</strong> Seamless incorporation of current and future technologies</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Flexibility:</strong> Adaptable spaces that can evolve with changing needs</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Wellness:</strong> Design elements that support physical and mental health</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Sustainability:</strong> Environmentally responsible materials and systems</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Brand Expression:</strong> Visual and experiential elements that reinforce identity</span>
            </li>
          </ul>
        </div>
      </section>
      
      <section>
        <h2 class="text-2xl font-bold mb-4">Design Development & Implementation</h2>
        <p class="mb-6">
          With the strategic framework in place, we develop detailed designs for your corporate space, addressing everything from architectural elements to furniture selection, lighting design, acoustics, and technology integration.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-card p-5 rounded-lg">
            <h3 class="text-lg font-bold mb-3">Concept Design</h3>
            <ul class="space-y-2 text-sm">
              <li>• Design concept development</li>
              <li>• Space planning refinement</li>
              <li>• Material and finish palettes</li>
              <li>• Preliminary 3D visualizations</li>
              <li>• Budget alignment</li>
            </ul>
          </div>
          
          <div class="bg-card p-5 rounded-lg">
            <h3 class="text-lg font-bold mb-3">Detailed Design</h3>
            <ul class="space-y-2 text-sm">
              <li>• Construction documentation</li>
              <li>• Furniture specifications</li>
              <li>• Lighting and acoustic design</li>
              <li>• Technology coordination</li>
              <li>• Sustainability strategies</li>
            </ul>
          </div>
          
          <div class="bg-card p-5 rounded-lg">
            <h3 class="text-lg font-bold mb-3">Implementation</h3>
            <ul class="space-y-2 text-sm">
              <li>• Contractor selection support</li>
              <li>• Construction administration</li>
              <li>• Furniture procurement</li>
              <li>• Move management</li>
              <li>• Post-occupancy evaluation</li>
            </ul>
          </div>
        </div>
        
        <p>
          Throughout the process, we maintain clear communication and collaboration with your team, ensuring that the final result meets your expectations and supports your organizational goals. Our involvement continues through construction and move-in, ensuring a smooth transition to your new space.
        </p>
      </section>
      
      <section>
        <h2 class="text-2xl font-bold mb-4">Case Studies</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-card rounded-lg overflow-hidden">
            <div class="aspect-video bg-muted relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-muted-foreground">Financial Services Headquarters Image</span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="text-xl font-bold mb-2">Financial Services Headquarters</h3>
              <p class="text-sm text-muted-foreground mb-3">Cape Town, 2022</p>
              <p class="text-sm mb-4">
                A 5,000 sqm headquarters designed to balance traditional corporate values with a modern, collaborative work environment. The design features a mix of private offices, open workstations, and varied collaboration spaces.
              </p>
              <button class="text-primary hover:underline text-sm flex items-center">
                View Case Study
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="bg-card rounded-lg overflow-hidden">
            <div class="aspect-video bg-muted relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-muted-foreground">Tech Company Office Image</span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="text-xl font-bold mb-2">Tech Company Office</h3>
              <p class="text-sm text-muted-foreground mb-3">Johannesburg, 2021</p>
              <p class="text-sm mb-4">
                A dynamic, flexible workspace for a growing technology company, designed to support agile work methods and foster innovation. The space features reconfigurable furniture, abundant collaboration areas, and integrated technology.
              </p>
              <button class="text-primary hover:underline text-sm flex items-center">
                View Case Study
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
