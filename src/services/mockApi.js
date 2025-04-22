// Mock API service for development
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const projects = [
  {
    id: '1',
    title: 'Modern Residential Complex',
    slug: 'modern-residential-complex',
    description: 'A sustainable residential complex with modern amenities',
    content: '<p>This project features innovative design solutions for urban living.</p>',
    main_image_url: 'https://placehold.co/600x400',
    gallery_image_urls: ['https://placehold.co/600x400', 'https://placehold.co/600x400'],
    category_id: '1',
    published: true,
    created_at: '2023-01-15T12:00:00Z',
    updated_at: '2023-02-20T14:30:00Z'
  },
  {
    id: '2',
    title: 'Urban Renewal Project',
    slug: 'urban-renewal-project',
    description: 'Revitalizing an abandoned industrial area into a vibrant community space',
    content: '<p>This urban renewal project transformed an abandoned industrial area into a vibrant community space.</p>',
    main_image_url: 'https://placehold.co/600x400',
    gallery_image_urls: ['https://placehold.co/600x400', 'https://placehold.co/600x400'],
    category_id: '2',
    published: true,
    created_at: '2023-03-10T09:15:00Z',
    updated_at: '2023-04-05T11:45:00Z'
  }
];

const categories = [
  {
    id: '1',
    name: 'Residential',
    slug: 'residential',
    description: 'Residential architecture projects',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Urban Design',
    slug: 'urban-design',
    description: 'Urban design and planning projects',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Commercial',
    slug: 'commercial',
    description: 'Commercial architecture projects',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  }
];

// Mock API endpoints
export const mockApi = {
  // Projects
  async getProjects() {
    await delay(500);
    return { data: projects };
  },
  
  async getProjectById(id) {
    await delay(300);
    const project = projects.find(p => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    return { data: project };
  },
  
  async createProject(projectData) {
    await delay(800);
    const newProject = {
      id: String(projects.length + 1),
      ...projectData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    projects.push(newProject);
    return { data: newProject };
  },
  
  async updateProject(id, projectData) {
    await delay(800);
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }
    
    const updatedProject = {
      ...projects[index],
      ...projectData,
      updated_at: new Date().toISOString()
    };
    
    projects[index] = updatedProject;
    return { data: updatedProject };
  },
  
  async deleteProject(id) {
    await delay(500);
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }
    
    projects.splice(index, 1);
    return { success: true };
  },
  
  // Categories
  async getCategories() {
    await delay(300);
    return { data: categories };
  },
  
  async getCategoryById(id) {
    await delay(200);
    const category = categories.find(c => c.id === id);
    if (!category) {
      throw new Error('Category not found');
    }
    return { data: category };
  }
};

export default mockApi;
