<script lang="ts">
// Toaster component
import ToastProvider from './ToastProvider.vue'
import Toast from './Toast.vue'

export default {
  name: 'Toaster',
  components: {
    ToastProvider,
    Toast
  },
  data() {
    return {
      toastService: {
        toasts: new Map(),
        dismiss: (id: string) => {}
      }
    }
  },
  computed: {
    toasts() {
      return this.toastService.toasts
    }
  },
  methods: {
    dismiss(id: string) {
      this.toastService.dismiss(id)
    }
  }
}
</script>

<template>
  <ToastProvider>
    <Toast
      v-for="toast in Array.from(toasts.values())"
      :key="toast.id"
      :title="toast.title"
      :description="toast.description"
      :variant="toast.type"
      :duration="toast.duration"
      @close="dismiss(toast.id)"
    />
  </ToastProvider>
</template>
