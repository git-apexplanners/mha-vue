import { reactive } from 'vue';
const toasts = reactive(new Map());
export function useToast() {
    const generateId = () => Math.random().toString(36).substring(2, 9);

    const toast = (options) => {
        const id = generateId();
        const newToast = {
            id,
            title: options.title,
            description: options.description,
            type: options.type || 'default',
            duration: options.duration || 5000
        };

        toasts.set(id, newToast);

        if (newToast.duration > 0) {
            setTimeout(() => {
                dismiss(id);
            }, newToast.duration);
        }

        return id;
    };

    const dismiss = (id) => {
        toasts.delete(id);
    };

    const dismissAll = () => {
        toasts.clear();
    };

    return {
        toasts,
        toast,
        dismiss,
        dismissAll,
        // Convenience methods
        success: (options) => toast({ ...options, type: 'success' }),
        error: (options) => toast({ ...options, type: 'destructive' }),
    };
}
// Create a singleton instance for global use
export const toastService = useToast();
