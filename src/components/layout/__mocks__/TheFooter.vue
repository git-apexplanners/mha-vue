<![CDATA[<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheFooter',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
})
</script>

<template>
  <footer class="bg-background border-t border-border py-8">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold">Michael Hart Architects</h3>
          <p class="text-muted-foreground">33+ years of architectural excellence</p>
          <p class="text-muted-foreground">Creating spaces that inspire</p>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <a href="/" class="text-muted-foreground hover:text-foreground">Home</a>
            </li>
            <li>
              <a href="/projects" class="text-muted-foreground hover:text-foreground">Projects</a>
            </li>
            <li>
              <a href="/about" class="text-muted-foreground hover:text-foreground">About</a>
            </li>
            <li>
              <a href="/contact" class="text-muted-foreground hover:text-foreground">Contact</a>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold">Services</h3>
          <ul class="space-y-2">
            <li>
              <a href="/services/residential" class="text-muted-foreground hover:text-foreground">Residential Design</a>
            </li>
            <li>
              <a href="/services/commercial" class="text-muted-foreground hover:text-foreground">Commercial Architecture</a>
            </li>
            <li>
              <a href="/services/urban" class="text-muted-foreground hover:text-foreground">Urban Planning</a>
            </li>
            <li>
              <a href="/services/interior" class="text-muted-foreground hover:text-foreground">Interior Design</a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold">Contact</h3>
          <address class="not-italic text-muted-foreground">
            <p>123 Architecture Street</p>
            <p>Design District, City</p>
            <p>Country, Postal Code</p>
          </address>
          <p class="text-muted-foreground">
            <a href="mailto:info@michaelhartarchitects.com" class="hover:text-foreground">info@michaelhartarchitects.com</a>
          </p>
          <p class="text-muted-foreground">
            <a href="tel:+1234567890" class="hover:text-foreground">+1 (234) 567-890</a>
          </p>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 border-t border-border pt-8 text-center text-muted-foreground">
        <p>&copy; {{ currentYear }} Michael Hart Architects. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>]]>
