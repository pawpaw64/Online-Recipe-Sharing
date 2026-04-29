import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

export default function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from ?? '/'
  const defaultTab = new URLSearchParams(location.search).get('tab') ?? 'login'
  const [tab, setTab] = useState<'login' | 'register'>(defaultTab as 'login' | 'register')

  const handleSuccess = () => navigate(from, { replace: true })

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-center font-display text-2xl">
          {tab === 'login' ? 'Welcome back' : 'Create account'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex rounded-lg border p-1">
          <Button
            variant={tab === 'login' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1"
            onClick={() => setTab('login')}
          >
            Sign in
          </Button>
          <Button
            variant={tab === 'register' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1"
            onClick={() => setTab('register')}
          >
            Register
          </Button>
        </div>

        {tab === 'login' ? (
          <LoginForm onSuccess={handleSuccess} />
        ) : (
          <RegisterForm onSuccess={handleSuccess} />
        )}
      </CardContent>
    </Card>
  )
}
