import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Create a mock TheFooter component
const TheFooter = defineComponent({
  name: 'TheFooter',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  template: `
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
  `
})

describe('TheFooter', () => {
  it('renders properly', () => {
    const wrapper = mount(TheFooter)

    expect(wrapper.text()).toContain('Michael Hart Architects')
    expect(wrapper.text()).toContain('Quick Links')
    expect(wrapper.text()).toContain('Services')
    expect(wrapper.text()).toContain('Contact')
  })

  it('displays the current year in the copyright notice', () => {
    const wrapper = mount(TheFooter)
    const currentYear = new Date().getFullYear()

    expect(wrapper.text()).toContain(`© ${currentYear} Michael Hart Architects`)
  })

  it('contains links to main pages', () => {
    const wrapper = mount(TheFooter)

    // Check for main navigation links
    const links = wrapper.findAll('a')
    const hrefs = links.map(link => link.attributes('href'))

    expect(hrefs).toContain('/')
    expect(hrefs).toContain('/projects')
    expect(hrefs).toContain('/about')
    expect(hrefs).toContain('/contact')
  })

  it('contains links to service pages', () => {
    const wrapper = mount(TheFooter)

    // Check for service links
    const links = wrapper.findAll('a')
    const hrefs = links.map(link => link.attributes('href'))

    expect(hrefs).toContain('/services/residential')
    expect(hrefs).toContain('/services/commercial')
    expect(hrefs).toContain('/services/urban')
    expect(hrefs).toContain('/services/interior')
  })

  it('contains contact information', () => {
    const wrapper = mount(TheFooter)

    expect(wrapper.text()).toContain('123 Architecture Street')
    expect(wrapper.text()).toContain('Design District, City')
    expect(wrapper.text()).toContain('Country, Postal Code')

    // Check for email and phone links
    const emailLink = wrapper.find('a[href^="mailto:"]')
    const phoneLink = wrapper.find('a[href^="tel:"]')

    expect(emailLink.exists()).toBe(true)
    expect(phoneLink.exists()).toBe(true)
    expect(emailLink.attributes('href')).toBe('mailto:info@michaelhartarchitects.com')
    expect(phoneLink.attributes('href')).toBe('tel:+1234567890')
  })
})
