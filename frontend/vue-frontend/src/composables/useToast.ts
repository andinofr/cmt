import { ref } from 'vue'

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

const toasts = ref<Toast[]>([])

export const useToast = () => {
  const toast = (options: Omit<Toast, 'id'>) => {
    const id = Date.now().toString()
    const newToast: Toast = {
      id,
      variant: 'default',
      ...options
    }

    toasts.value.push(newToast)

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id)
    }, 5000)

    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toast,
    toasts,
    removeToast
  }
}