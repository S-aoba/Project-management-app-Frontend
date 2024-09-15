import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { useErrorMessage } from '@/hooks/use-error-message'
import { toast } from 'sonner'
import { useCsrfToken } from './use-csrf-token'

type LoginProps = {
  email: string
  password: string
}

export const useAuth = () => {
  const router = useRouter()
  const { csrfToken, getCsrfToken } = useCsrfToken()

  const { conversionErrorMessage } = useErrorMessage()

  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: async ({ email, password }: LoginProps) => {
      await csrfToken()

      const csrf = getCsrfToken()

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      router.push('/')

      toast.success('Login successfully.')
    },
  })

  const {
    mutate: logout,
    isPending: isLogoutPending,
    isError: isLogoutError,
    error,
  } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await csrfToken()

      const csrf = getCsrfToken()
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      window.location.pathname = '/login'
    },
    onError: (error: Error) => {
      toast.error(conversionErrorMessage(error.message))

      router.replace('/login')
    },
  })

  return { login, isLoginPending, logout, isLogoutError, isLogoutPending, error }
}
