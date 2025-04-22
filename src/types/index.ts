// Type definitions for the application

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  main_image_url: string;
  gallery_image_urls: string[];
  category_id: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: 'default' | 'success' | 'destructive' | 'warning' | 'info';
  duration: number;
}
