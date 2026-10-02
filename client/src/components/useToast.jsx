import { useState } from 'react'
import { Toast } from './ui'

// Hook de aviso (toast): `const { show, ToastEl } = useToast()` e depois `show('mensagem', 'success')`
export function useToast() {
  const [toast, setToast] = useState(null)
  const show = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }
  const ToastEl = toast ? <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null
  return { show, ToastEl }
}
