// This file provides type declarations for Vue's script setup syntax
// to help Vetur understand the Vue components

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Declare Vue script setup macros
declare function defineProps<T>(props: T): T
declare function defineEmits<T extends string[]>(events: T): Record<T[number], (...args: any[]) => void>
declare function defineExpose<T>(exposed: T): void
