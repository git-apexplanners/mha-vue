import axios from 'axios'

// Types for file upload
export interface FileUploadOptions {
  file: File
  folder?: string
  onProgress?: (progress: number) => void
  maxSizeMB?: number
  allowedTypes?: string[]
}

export interface FileUploadResult {
  url: string
  filename: string
  size: number
  type: string
  path: string
}

/**
 * File storage utility for handling image uploads
 * This implementation uses a REST API endpoint for file uploads
 */
export class FileStorage {
  private baseUrl: string
  private apiKey: string

  constructor(baseUrl: string = '', apiKey: string = '') {
    this.baseUrl = baseUrl || import.meta.env.VITE_API_URL || ''
    this.apiKey = apiKey || import.meta.env.VITE_API_KEY || ''
  }

  /**
   * Validate file before upload
   * @param file File to validate
   * @param maxSizeMB Maximum file size in MB
   * @param allowedTypes Array of allowed MIME types
   * @returns Error message if validation fails, null if validation passes
   */
  private validateFile(file: File, maxSizeMB: number = 5, allowedTypes: string[] = []): string | null {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSizeMB) {
      return `File size exceeds the maximum allowed size of ${maxSizeMB}MB`
    }

    // Check file type if allowedTypes is provided
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`
    }

    return null
  }

  /**
   * Upload a file to the server
   * @param options Upload options
   * @returns Promise with upload result
   */
  async uploadFile(options: FileUploadOptions): Promise<FileUploadResult> {
    const { 
      file, 
      folder = 'uploads', 
      onProgress, 
      maxSizeMB = 5,
      allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    } = options

    // Validate file
    const validationError = this.validateFile(file, maxSizeMB, allowedTypes)
    if (validationError) {
      throw new Error(validationError)
    }

    // Create form data
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    try {
      // Upload file with progress tracking
      const response = await axios.post(`${this.baseUrl}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${this.apiKey}`
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(progress)
          }
        }
      })

      return response.data
    } catch (error) {
      console.error('File upload failed:', error)
      throw error
    }
  }

  /**
   * Delete a file from the server
   * @param path Path of the file to delete
   * @returns Promise with deletion result
   */
  async deleteFile(path: string): Promise<{ success: boolean }> {
    try {
      const response = await axios.delete(`${this.baseUrl}/api/upload`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        data: { path }
      })

      return response.data
    } catch (error) {
      console.error('File deletion failed:', error)
      throw error
    }
  }

  /**
   * Get a signed URL for a file (for temporary access)
   * @param path Path of the file
   * @param expiresIn Expiration time in seconds
   * @returns Promise with signed URL
   */
  async getSignedUrl(path: string, expiresIn: number = 3600): Promise<{ url: string }> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/upload/signed-url`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        params: { path, expiresIn }
      })

      return response.data
    } catch (error) {
      console.error('Failed to get signed URL:', error)
      throw error
    }
  }
}
