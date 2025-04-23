import { ref, reactive } from 'vue'

export type ToastType = 'default' | 'destructive' | 'success'

export interface Toast {
  id: string
  title?: string
  description?: string
  type: ToastType
  duration: number
}

const toasts = reactive<Map<string, Toast>>(new Map())

export function useToast() {
  const generateId = () => Math.random().toString(36).substring(2, 9)

  const toast = (options: {
    title?: string
    description?: string
    type?: ToastType
    duration?: number
  }) => {
    const id = generateId()
    const newToast: Toast = {
      id,
      title: options.title,
      description: options.description,
      type: options.type || 'default',
      duration: options.duration || 5000
    }

    toasts.set(id, newToast)

    if (newToast.duration > 0) {
      setTimeout(() => {
        dismiss(id)
      }, newToast.duration)
    }

    return id
  }

  const dismiss = (id: string) => {
    toasts.delete(id)
  }

  const dismissAll = () => {
    toasts.clear()
  }

  return {
    toasts,
    toast,
    dismiss,
    dismissAll,
    // Convenience methods
    success: (options: Omit<Parameters<typeof toast>[0], 'type'>) =>
      toast({ ...options, type: 'success' }),
    error: (options: Omit<Parameters<typeof toast>[0], 'type'>) =>
      toast({ ...options, type: 'destructive' }),
    warning: (options: Omit<Parameters<typeof toast>[0], 'type'>) =>
      toast({ ...options, type: 'default', duration: 7000 }),
    info: (options: Omit<Parameters<typeof toast>[0], 'type'>) =>
      toast({ ...options, type: 'default' }),
  }
}

// Create a singleton instance for global use
export const toastService = useToast()
