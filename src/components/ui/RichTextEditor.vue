<template>
  <div class="rich-text-editor">
    <!-- Editor Menu Bar -->
    <div class="menu-bar bg-muted p-2 rounded-t-md flex flex-wrap gap-1 border-b">
      <!-- Text Formatting -->
      <button
        @click="editor?.chain().focus().toggleBold().run()"
        :class="{ 'is-active bg-primary text-primary-foreground': editor?.isActive('bold') }"
        class="p-1 rounded hover:bg-accent"
        title="Bold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
          <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
        </svg>
      </button>
      <button
        @click="editor?.chain().focus().toggleItalic().run()"
        :class="{ 'is-active bg-primary text-primary-foreground': editor?.isActive('italic') }"
        class="p-1 rounded hover:bg-accent"
        title="Italic"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="4" x2="10" y2="4"></line>
          <line x1="14" y1="20" x2="5" y2="20"></line>
          <line x1="15" y1="4" x2="9" y2="20"></line>
        </svg>
      </button>
      <button
        @click="editor?.chain().focus().toggleUnderline().run()"
        :class="{ 'is-active bg-primary text-primary-foreground': editor?.isActive('underline') }"
        class="p-1 rounded hover:bg-accent"
        title="Underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
          <line x1="4" y1="21" x2="20" y2="21"></line>
        </svg>
      </button>
      <button
        @click="editor?.chain().focus().toggleStrike().run()"
        :class="{ 'is-active bg-primary text-primary-foreground': editor?.isActive('strike') }"
        class="p-1 rounded hover:bg-accent"
        title="Strikethrough"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="12" x2="20" y2="12"></line>
          <line x1="9" y1="6" x2="9.01" y2="6"></line>
          <line x1="15" y1="6" x2="15.01" y2="6"></line>
          <path d="M12 6a4 4 0 0 0-4 4M16 10a4 4 0 0 1-4 4"></path>
          <path d="M7 18.5a6 6 0 0 0 5 0 6 6 0 0 0 5 0"></path>
        </svg>
      </button>

      <div class="w-px h-6 bg-border mx-1"></div>

      <!-- Headings -->
      <button
        @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active bg-primary text-primary-foreground': editor?.isActive('heading', { level: 1 }) }"
        class="p-1 rounded hover:bg-accent"
        title="Heading 1"
      >
        <span class="font-bold">H1</span>
      </button>
      <button
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active bg-primary text-primary-foreground': editor?.isActive('heading', { level: 2 }) }"
        class="p-1 rounded hover:bg-accent"
        title="Heading 2"
      >
        <span class="font-bold">H2</span>
      </button>
      <button
        @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active bg-primary text-primary-foreground': editor?.isActive('heading', { level: 3 }) }"
        class="p-1 rounded hover:bg-accent"
        title="Heading 3"
      >
        <span class="font-bold">H3</span>
      </button>

      <div class="w-px h-6 bg-border mx-1"></div>

      <!-- Lists -->
      <button
        @click="editor?.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active bg-primary text-primary-foreground': editor?.isActive('bulletList') }"
        class="p-1 rounded hover:bg-accent"
        title="Bullet List"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>
      <button
        @click="editor?.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active bg-primary text-primary-foreground': editor?.isActive('orderedList') }"
        class="p-1 rounded hover:bg-accent"
        title="Ordered List"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="10" y1="6" x2="21" y2="6"></line>
          <line x1="10" y1="12" x2="21" y2="12"></line>
          <line x1="10" y1="18" x2="21" y2="18"></line>
          <path d="M4 6h1v4"></path>
          <path d="M4 10h2"></path>
          <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
        </svg>
      </button>

      <div class="w-px h-6 bg-border mx-1"></div>

      <!-- Alignment -->
      <button
        @click="editor?.chain().focus().setTextAlign('left').run()"
        :class="{ 'is-active bg-primary text-primary-foreground': editor?.isActive({ textAlign: 'left' }) }"
        class="p-1 rounded hover:bg-accent"
        title="Align Left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="21" y1="6" x2="3" y2="6"></line>
          <line x1="15" y1="12" x2="3" y2="12"></line>
          <line x1="17" y1="18" x2="3" y2="18"></line>
        </svg>
      </button>
      <button
        @click="editor?.chain().focus().setTextAlign('center').run()"
        :class="{ 'is-active bg-primary text-primary-foreground': editor?.isActive({ textAlign: 'center' }) }"
        class="p-1 rounded hover:bg-accent"
        title="Align Center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="21" y1="6" x2="3" y2="6"></line>
          <line x1="18" y1="12" x2="6" y2="12"></line>
          <line x1="19" y1="18" x2="5" y2="18"></line>
        </svg>
      </button>
      <button
        @click="editor?.chain().focus().setTextAlign('right').run()"
        :class="{ 'is-active bg-primary text-primary-foreground': editor?.isActive({ textAlign: 'right' }) }"
        class="p-1 rounded hover:bg-accent"
        title="Align Right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="21" y1="6" x2="3" y2="6"></line>
          <line x1="21" y1="12" x2="9" y2="12"></line>
          <line x1="21" y1="18" x2="7" y2="18"></line>
        </svg>
      </button>

      <div class="w-px h-6 bg-border mx-1"></div>

      <!-- Links and Media -->
      <button
        @click="addLink"
        :class="{ 'is-active bg-primary text-primary-foreground': editor?.isActive('link') }"
        class="p-1 rounded hover:bg-accent"
        title="Add Link"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      </button>
      <button
        @click="addImage"
        class="p-1 rounded hover:bg-accent"
        title="Add Image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      </button>

      <div class="w-px h-6 bg-border mx-1"></div>

      <!-- Undo/Redo -->
      <button
        @click="editor?.chain().focus().undo().run()"
        class="p-1 rounded hover:bg-accent"
        title="Undo"
        :disabled="!editor?.can()?.undo()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 7v6h6"></path>
          <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
        </svg>
      </button>
      <button
        @click="editor?.chain().focus().redo().run()"
        class="p-1 rounded hover:bg-accent"
        title="Redo"
        :disabled="!editor?.can()?.redo()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 7v6h-6"></path>
          <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path>
        </svg>
      </button>
    </div>

    <!-- Editor Content -->
    <div
      class="editor-content border border-t-0 rounded-b-md p-4 min-h-[200px] bg-background"
      :class="{ 'border-destructive': error }"
    >
      <editor-content :editor="editor" />
    </div>

    <!-- Error Message -->
    <p v-if="error" class="text-sm text-destructive mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { toastService } from '@/composables/useToast'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Write something...'
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// Initialize editor
const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline'
        }
      }),
      Image.configure({
        inline: true,
        allowBase64: true
      }),
      Placeholder.configure({
        placeholder: props.placeholder
      })
    ],
    content: props.modelValue,
    onUpdate: ({ editor }) => {
      emit('update:modelValue', editor.getHTML())
    }
  })
})

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  // Only update if the editor exists and the content is different
  if (editor.value && newValue !== editor.value.getHTML()) {
    editor.value.commands.setContent(newValue, false)
  }
})

// Clean up on unmount
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

// Add link
const addLink = () => {
  if (!editor.value) return

  const url = prompt('URL')

  if (url) {
    editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  } else if (editor.value.isActive('link')) {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
  }
}

// Add image
const addImage = () => {
  if (!editor.value) return

  const url = prompt('Image URL')

  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}
</script>

<style>
/* Editor Styles */
.ProseMirror {
  outline: none;
}

.ProseMirror p {
  margin-bottom: 0.75em;
}

.ProseMirror h1 {
  font-size: 1.75em;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.ProseMirror h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.ProseMirror h3 {
  font-size: 1.25em;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.ProseMirror ul {
  list-style-type: disc;
  padding-left: 1.5em;
  margin-bottom: 0.75em;
}

.ProseMirror ol {
  list-style-type: decimal;
  padding-left: 1.5em;
  margin-bottom: 0.75em;
}

.ProseMirror img {
  max-width: 100%;
  height: auto;
  margin: 0.5em 0;
}

.ProseMirror a {
  color: #0066cc;
  text-decoration: underline;
}

.ProseMirror blockquote {
  border-left: 3px solid #ccc;
  padding-left: 1em;
  margin-left: 0;
  margin-right: 0;
  font-style: italic;
}

.ProseMirror code {
  background-color: rgba(#616161, 0.1);
  color: #616161;
  padding: 0.25em;
  border-radius: 0.25em;
}

.ProseMirror pre {
  background: #0D0D0D;
  color: #FFF;
  font-family: 'JetBrainsMono', monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75em;
}

.ProseMirror pre code {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}

.ProseMirror p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
