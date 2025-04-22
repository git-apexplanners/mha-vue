// Local data service that uses JSON files in the src/data directory
import projectsData from '../data/projects.json';
import categoriesData from '../data/categories.json';

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Create a copy of the data to work with
let projects = [...projectsData];
let categories = [...categoriesData];

export const localDataService = {
  // Projects
  async getProjects() {
    await delay(300);
    return { data: projects };
  },

  async getProjectById(id) {
    await delay(200);
    const project = projects.find(p => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    return { data: project };
  },

  async createProject(projectData) {
    await delay(500);
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
    await delay(500);
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
    await delay(300);
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }

    projects.splice(index, 1);
    return { success: true };
  },

  // Categories
  async getCategories() {
    await delay(200);
    return { data: categories };
  },

  async getCategoryById(id) {
    await delay(150);
    const category = categories.find(c => c.id === id);
    if (!category) {
      throw new Error('Category not found');
    }
    return { data: category };
  },

  async createCategory(categoryData) {
    await delay(500);
    const newCategory = {
      id: String(categories.length + 1),
      ...categoryData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    categories.push(newCategory);
    return { data: newCategory };
  },

  async updateCategory(id, categoryData) {
    await delay(500);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }

    const updatedCategory = {
      ...categories[index],
      ...categoryData,
      updated_at: new Date().toISOString()
    };

    categories[index] = updatedCategory;
    return { data: updatedCategory };
  },

  async deleteCategory(id) {
    await delay(300);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }

    categories.splice(index, 1);
    return { success: true };
  }
};

export default localDataService;
