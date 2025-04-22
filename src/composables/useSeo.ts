import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface MetaOptions {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
}

export function useSeo(options: MetaOptions = {}) {
  const route = useRoute()
  const title = ref(options.title || 'Michael Hart Architects')
  const description = ref(
    options.description ||
    'Michael Hart Architects is a leading architectural firm with over 33 years of experience in residential, commercial, and urban design.'
  )
  const keywords = ref(
    options.keywords ||
    'architecture, design, residential, commercial, urban planning, interior design'
  )
  const ogTitle = ref(options.ogTitle || title.value)
  const ogDescription = ref(options.ogDescription || description.value)
  const ogImage = ref(options.ogImage || '/images/og-image.jpg')
  const ogUrl = ref(options.ogUrl || '')
  const twitterCard = ref(options.twitterCard || 'summary_large_image')
  const twitterTitle = ref(options.twitterTitle || title.value)
  const twitterDescription = ref(options.twitterDescription || description.value)
  const twitterImage = ref(options.twitterImage || ogImage.value)

  // Define updateMetaTags function before using it in watch callbacks
  const updateMetaTags = () => {
    // Update document title
    document.title = title.value

    // Helper function to update meta tag
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = name
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    // Helper function to update property meta tag
    const updatePropertyMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    // Update basic meta tags
    updateMetaTag('description', description.value)
    updateMetaTag('keywords', keywords.value)

    // Update Open Graph meta tags
    updatePropertyMetaTag('og:title', ogTitle.value)
    updatePropertyMetaTag('og:description', ogDescription.value)
    updatePropertyMetaTag('og:image', ogImage.value)
    updatePropertyMetaTag('og:url', ogUrl.value || window.location.href)
    updatePropertyMetaTag('og:type', 'website')

    // Update Twitter meta tags
    updateMetaTag('twitter:card', twitterCard.value)
    updateMetaTag('twitter:title', twitterTitle.value)
    updateMetaTag('twitter:description', twitterDescription.value)
    updateMetaTag('twitter:image', twitterImage.value)
  }

  // Update meta tags when values change
  watch([
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage
  ], () => {
    updateMetaTags()
  })

  // Update meta tags when route changes
  watch(() => route.path, () => {
    if (!ogUrl.value) {
      ogUrl.value = window.location.origin + route.path
    }
    updateMetaTags()
  }, { immediate: true })

  return {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
    updateMetaTags
  }
}
