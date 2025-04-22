import { ref, computed } from 'vue'
import { FileStorage, FileUploadOptions, FileUploadResult } from '@/utils/fileStorage'

export function useFileUpload() {
  const fileStorage = new FileStorage()
  
  // State
  const isUploading = ref(false)
  const uploadProgress = ref(0)
  const uploadError = ref<Error | null>(null)
  const uploadResult = ref<FileUploadResult | null>(null)
  
  // Computed
  const hasError = computed(() => uploadError.value !== null)
  const isComplete = computed(() => uploadProgress.value === 100 && !isUploading.value)
  
  /**
   * Upload a file
   * @param options Upload options
   * @returns Promise with upload result
   */
  const uploadFile = async (options: Omit<FileUploadOptions, 'onProgress'>) => {
    isUploading.value = true
    uploadProgress.value = 0
    uploadError.value = null
    uploadResult.value = null
    
    try {
      // Add progress tracking
      const uploadOptions: FileUploadOptions = {
        ...options,
        onProgress: (progress) => {
          uploadProgress.value = progress
        }
      }
      
      // Upload file
      const result = await fileStorage.uploadFile(uploadOptions)
      uploadResult.value = result
      return result
    } catch (error) {
      uploadError.value = error as Error
      throw error
    } finally {
      isUploading.value = false
    }
  }
  
  /**
   * Delete a file
   * @param path Path of the file to delete
   * @returns Promise with deletion result
   */
  const deleteFile = async (path: string) => {
    try {
      return await fileStorage.deleteFile(path)
    } catch (error) {
      uploadError.value = error as Error
      throw error
    }
  }
  
  /**
   * Reset the upload state
   */
  const resetUpload = () => {
    isUploading.value = false
    uploadProgress.value = 0
    uploadError.value = null
    uploadResult.value = null
  }
  
  return {
    // State
    isUploading,
    uploadProgress,
    uploadError,
    uploadResult,
    
    // Computed
    hasError,
    isComplete,
    
    // Methods
    uploadFile,
    deleteFile,
    resetUpload
  }
}
