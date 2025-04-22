import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheFooter from './__mocks__/TheFooter.vue'

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
