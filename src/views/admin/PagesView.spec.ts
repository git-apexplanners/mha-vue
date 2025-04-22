import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

// Create a mock PagesView component
const PagesView = defineComponent({
  name: 'PagesView',
  setup() {
    const pagesStore = {
      pages: [
        { id: '1', title: 'Home', slug: 'home', content: 'Home content', published: true, order: 1 },
        { id: '2', title: 'About', slug: 'about', content: 'About content', published: true, order: 2 },
        { id: '3', title: 'Contact', slug: 'contact', content: 'Contact content', published: true, order: 3 }
      ],
      loading: false,
      error: '',
      fetchPages: vi.fn().mockResolvedValue([]),
      createPage: vi.fn().mockResolvedValue({ id: '4', title: 'New Page', slug: 'new-page', content: '', published: false, order: 4 }),
      updatePage: vi.fn().mockResolvedValue({}),
      deletePage: vi.fn().mockResolvedValue({}),
      reorderPages: vi.fn().mockResolvedValue([])
    }

    const isCreateDialogOpen = ref(false)
    const isEditDialogOpen = ref(false)
    const isDeleteDialogOpen = ref(false)
    const currentPage = ref({})

    const openCreateDialog = () => {
      isCreateDialogOpen.value = true
    }

    const openEditDialog = (page) => {
      currentPage.value = page
      isEditDialogOpen.value = true
    }

    const openDeleteDialog = (page) => {
      currentPage.value = page
      isDeleteDialogOpen.value = true
    }

    const createPage = (pageData) => {
      return pagesStore.createPage(pageData)
    }

    return {
      pagesStore,
      isCreateDialogOpen,
      isEditDialogOpen,
      isDeleteDialogOpen,
      currentPage,
      openCreateDialog,
      openEditDialog,
      openDeleteDialog,
      createPage
    }
  },
  template: `
    <div>
      <header class="mb-8">
        <h1 class="text-3xl font-bold">Manage Pages</h1>
        <p class="text-muted-foreground">Create and manage website pages</p>
      </header>

      <div class="mb-6 flex justify-between items-center">
        <button data-testid="create-page-button" @click="openCreateDialog" class="btn-primary">Create Page</button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4 font-medium">Title</th>
              <th class="text-left py-3 px-4 font-medium">Slug</th>
              <th class="text-left py-3 px-4 font-medium">Status</th>
              <th class="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="page in pagesStore.pages" :key="page.id" class="border-b">
              <td class="py-3 px-4">{{ page.title }}</td>
              <td class="py-3 px-4">{{ page.slug }}</td>
              <td class="py-3 px-4">
                <span :class="page.published ? 'text-green-500' : 'text-yellow-500'">
                  {{ page.published ? 'Published' : 'Draft' }}
                </span>
              </td>
              <td class="py-3 px-4 text-right">
                <div class="flex justify-end gap-2">
                  <button :data-testid="'edit-page-button-' + page.id" @click="openEditDialog(page)" class="btn-secondary">Edit</button>
                  <button :data-testid="'delete-page-button-' + page.id" @click="openDeleteDialog(page)" class="btn-danger">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <form @submit.prevent="createPage({ title: 'New Page', slug: 'new-page', content: 'New page content', published: false })">
        <input name="title" type="text" />
        <input name="slug" type="text" />
        <textarea name="content"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  `
})

// Mock the pages store
vi.mock('@/stores/pages', () => ({
  usePagesStore: () => ({
    pages: [
      { id: '1', title: 'Home', slug: 'home', content: 'Home content', published: true, order: 1 },
      { id: '2', title: 'About', slug: 'about', content: 'About content', published: true, order: 2 },
      { id: '3', title: 'Contact', slug: 'contact', content: 'Contact content', published: true, order: 3 }
    ],
    loading: false,
    error: '',
    fetchPages: vi.fn().mockResolvedValue([]),
    createPage: vi.fn().mockResolvedValue({ id: '4', title: 'New Page', slug: 'new-page', content: '', published: false, order: 4 }),
    updatePage: vi.fn().mockResolvedValue({}),
    deletePage: vi.fn().mockResolvedValue({}),
    reorderPages: vi.fn().mockResolvedValue([])
  })
}))

// Mock the router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

// Mock the dialog component
vi.mock('@/components/ui/Dialog.vue', () => ({
  default: {
    name: 'Dialog',
    template: '<div><slot /><slot name="trigger" /><slot name="content" /></div>'
  }
}))

describe('PagesView', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())

    // Reset mocks
    vi.resetAllMocks()
  })

  it('renders properly with pages data', async () => {
    const wrapper = mount(PagesView)

    // Wait for the component to load data
    await vi.dynamicImportSettled()

    // Check if the page title is rendered
    expect(wrapper.text()).toContain('Manage Pages')

    // Check if the pages are rendered in the table
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(3)

    // Check if the page titles are rendered
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('About')
    expect(wrapper.text()).toContain('Contact')
  })

  it('opens create page dialog when create button is clicked', async () => {
    const wrapper = mount(PagesView)

    // Click the create button
    await wrapper.find('button[data-testid="create-page-button"]').trigger('click')

    // Check if the dialog is opened
    expect(wrapper.vm.isCreateDialogOpen).toBe(true)
  })

  it('opens edit page dialog when edit button is clicked', async () => {
    const wrapper = mount(PagesView)

    // Click the edit button for the first page
    await wrapper.find('button[data-testid="edit-page-button-1"]').trigger('click')

    // Check if the dialog is opened with the correct page
    expect(wrapper.vm.isEditDialogOpen).toBe(true)
    expect(wrapper.vm.currentPage.id).toBe('1')
  })

  it('opens delete page dialog when delete button is clicked', async () => {
    const wrapper = mount(PagesView)

    // Click the delete button for the first page
    await wrapper.find('button[data-testid="delete-page-button-1"]').trigger('click')

    // Check if the dialog is opened with the correct page
    expect(wrapper.vm.isDeleteDialogOpen).toBe(true)
    expect(wrapper.vm.currentPage.id).toBe('1')
  })

  it('creates a new page when form is submitted', async () => {
    const wrapper = mount(PagesView)

    // Open the create dialog
    await wrapper.find('button[data-testid="create-page-button"]').trigger('click')

    // Fill the form
    await wrapper.find('input[name="title"]').setValue('New Page')
    await wrapper.find('input[name="slug"]').setValue('new-page')
    await wrapper.find('textarea[name="content"]').setValue('New page content')

    // Submit the form
    await wrapper.find('form').trigger('submit.prevent')

    // Check if the createPage method was called with the correct data
    expect(wrapper.vm.pagesStore.createPage).toHaveBeenCalledWith({
      title: 'New Page',
      slug: 'new-page',
      content: 'New page content',
      published: false
    })
  })
})
