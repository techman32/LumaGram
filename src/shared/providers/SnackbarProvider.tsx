'use client'
import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

type SnackbarType = 'success' | 'error' | 'info'

interface Snackbar {
  id: number
  message: string
  type: SnackbarType
}

interface SnackbarContextType {
  showSnackbar: (message: string, type?: SnackbarType) => void
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)

export const useSnackbar = () => {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}

let idCounter = 0

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbars, setSnackbars] = useState<Snackbar[]>([])

  const showSnackbar = useCallback((message: string, type: SnackbarType = 'info') => {
    const id = ++idCounter
    setSnackbars((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setSnackbars((prev) => prev.filter((snack) => snack.id !== id))
    }, 3000)
  }, [])

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <div className="fixed top-14 right-4 flex flex-col gap-2 z-50 items-end">
        {snackbars.map((snack) => (
          <div
            key={snack.id}
            className={`px-4 py-2 rounded shadow text-white ${
              snack.type === 'success' ? 'bg-green-500' : snack.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {snack.message}
          </div>
        ))}
      </div>
    </SnackbarContext.Provider>
  )
}
