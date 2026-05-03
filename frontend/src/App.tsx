import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from '@/providers/QueryProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { AuthProvider } from '@/providers/AuthProvider'
import { ToastProvider } from '@/providers/ToastProvider'
import { router } from '@/router'

export default function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
