<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useFileUpload } from '@/composables/useFileUpload'

export default defineComponent({
  name: 'FileUpload',
  props: {
    accept: {
      type: String,
      default: 'image/*'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    maxSize: {
      type: Number,
      default: 5 // 5MB
    },
    folder: {
      type: String,
      default: 'uploads'
    },
    allowedTypes: {
      type: Array as () => string[],
      default: () => ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    }
  },
  emits: ['upload-complete', 'upload-error', 'file-selected'],
  setup(props, { emit }) {
    const fileInput = ref<HTMLInputElement | null>(null)
    const selectedFile = ref<File | null>(null)
    const previewUrl = ref<string | null>(null)
    
    const { 
      isUploading, 
      uploadProgress, 
      uploadError, 
      uploadResult, 
      hasError, 
      isComplete, 
      uploadFile, 
      resetUpload 
    } = useFileUpload()
    
    // Computed properties
    const progressStyle = computed(() => ({
      width: `${uploadProgress.value}%`
    }))
    
    const fileSize = computed(() => {
      if (!selectedFile.value) return '0 KB'
      
      const size = selectedFile.value.size
      if (size < 1024) return `${size} B`
      if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
      return `${(size / (1024 * 1024)).toFixed(2)} MB`
    })
    
    // Methods
    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    
    const handleFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement
      if (input.files && input.files.length > 0) {
        const file = input.files[0]
        selectedFile.value = file
        emit('file-selected', file)
        
        // Create preview URL for images
        if (file.type.startsWith('image/')) {
          previewUrl.value = URL.createObjectURL(file)
        } else {
          previewUrl.value = null
        }
      }
    }
    
    const handleUpload = async () => {
      if (!selectedFile.value) return
      
      try {
        const result = await uploadFile({
          file: selectedFile.value,
          folder: props.folder,
          maxSizeMB: props.maxSize,
          allowedTypes: props.allowedTypes
        })
        
        emit('upload-complete', result)
      } catch (error) {
        emit('upload-error', error)
      }
    }
    
    const clearSelection = () => {
      selectedFile.value = null
      if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value)
        previewUrl.value = null
      }
      if (fileInput.value) {
        fileInput.value.value = ''
      }
      resetUpload()
    }
    
    return {
      fileInput,
      selectedFile,
      previewUrl,
      isUploading,
      uploadProgress,
      uploadError,
      uploadResult,
      hasError,
      isComplete,
      progressStyle,
      fileSize,
      triggerFileInput,
      handleFileChange,
      handleUpload,
      clearSelection
    }
  }
})
</script>

<template>
  <div class="file-upload">
    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      :multiple="multiple"
      class="hidden"
      @change="handleFileChange"
    />
    
    <!-- File selection area -->
    <div 
      v-if="!selectedFile"
      @click="triggerFileInput"
      class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div class="flex flex-col items-center justify-center space-y-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-gray-400">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <div class="text-sm font-medium">
          Click to upload or drag and drop
        </div>
        <p class="text-xs text-gray-500">
          {{ accept.replace('*', '') }} (up to {{ maxSize }}MB)
        </p>
      </div>
    </div>
    
    <!-- Selected file preview -->
    <div v-else class="border rounded-lg p-4">
      <div class="flex items-start justify-between">
        <div class="flex items-center space-x-3">
          <!-- Image preview -->
          <div v-if="previewUrl" class="h-16 w-16 rounded overflow-hidden bg-gray-100">
            <img :src="previewUrl" alt="Preview" class="h-full w-full object-cover" />
          </div>
          
          <!-- File icon for non-images -->
          <div v-else class="h-16 w-16 rounded bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-gray-400">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          
          <!-- File info -->
          <div class="flex flex-col">
            <span class="text-sm font-medium truncate max-w-[200px]">{{ selectedFile.name }}</span>
            <span class="text-xs text-gray-500">{{ fileSize }}</span>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center space-x-2">
          <button
            @click="clearSelection"
            class="text-gray-500 hover:text-gray-700"
            type="button"
            aria-label="Remove file"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Upload progress -->
      <div v-if="isUploading || isComplete" class="mt-4">
        <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-primary transition-all duration-300 ease-in-out"
            :style="progressStyle"
          ></div>
        </div>
        <div class="flex justify-between mt-1">
          <span class="text-xs text-gray-500">{{ uploadProgress }}%</span>
          <span v-if="isComplete" class="text-xs text-green-500">Complete</span>
        </div>
      </div>
      
      <!-- Error message -->
      <div v-if="hasError" class="mt-2 text-sm text-destructive">
        {{ uploadError?.message }}
      </div>
      
      <!-- Upload button -->
      <button
        v-if="!isUploading && !isComplete"
        @click="handleUpload"
        class="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        type="button"
      >
        Upload
      </button>
    </div>
  </div>
</template>
