import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useSeo } from './useSeo'

// Mock the document object
const mockDocument = {
  title: '',
  head: {
    appendChild: vi.fn()
  },
  querySelector: vi.fn(),
  createElement: vi.fn()
}

// Mock the window object
const mockWindow = {
  location: {
    href: 'https://example.com/test',
    origin: 'https://example.com'
  }
}

// Mock the route object
const mockRoute = {
  path: '/test'
}

// Mock the watch function
vi.mock('vue', () => ({
  ref: (val: any) => ({ value: val }),
  watch: vi.fn((_, callback) => callback())
}))

// Mock the useRoute function
vi.mock('vue-router', () => ({
  useRoute: () => mockRoute
}))

describe('useSeo', () => {
  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks()
    
    // Setup document mock
    global.document = mockDocument as any
    global.window = mockWindow as any
    
    // Setup querySelector mock to return null (no existing meta tags)
    mockDocument.querySelector.mockReturnValue(null)
    
    // Setup createElement mock
    const mockMetaElement = {
      name: '',
      content: '',
      setAttribute: vi.fn()
    }
    mockDocument.createElement.mockReturnValue(mockMetaElement)
  })

  it('sets default values when no options are provided', () => {
    const seo = useSeo()
    
    expect(seo.title.value).toBe('Michael Hart Architects')
    expect(seo.description.value).toContain('Michael Hart Architects is a leading architectural firm')
    expect(seo.keywords.value).toContain('architecture, design')
  })

  it('uses provided values when options are given', () => {
    const seo = useSeo({
      title: 'Custom Title',
      description: 'Custom Description',
      keywords: 'custom, keywords'
    })
    
    expect(seo.title.value).toBe('Custom Title')
    expect(seo.description.value).toBe('Custom Description')
    expect(seo.keywords.value).toBe('custom, keywords')
  })

  it('updates document title', () => {
    const seo = useSeo({ title: 'Test Title' })
    
    // The watch mock should trigger updateMetaTags
    expect(document.title).toBe('Test Title')
  })

  it('creates meta tags if they do not exist', () => {
    useSeo({
      title: 'Test Title',
      description: 'Test Description'
    })
    
    // Should create meta tags
    expect(mockDocument.createElement).toHaveBeenCalledWith('meta')
    expect(mockDocument.head.appendChild).toHaveBeenCalled()
  })

  it('sets Open Graph meta tags', () => {
    const seo = useSeo({
      ogTitle: 'OG Title',
      ogDescription: 'OG Description',
      ogImage: '/test-image.jpg'
    })
    
    // Check that the meta tags were created
    expect(mockDocument.createElement).toHaveBeenCalledWith('meta')
    
    // Check that the setAttribute was called for og properties
    const mockMetaElement = mockDocument.createElement()
    expect(mockMetaElement.setAttribute).toHaveBeenCalledWith('property', 'og:title')
    expect(mockMetaElement.setAttribute).toHaveBeenCalledWith('property', 'og:description')
    expect(mockMetaElement.setAttribute).toHaveBeenCalledWith('property', 'og:image')
  })
})
