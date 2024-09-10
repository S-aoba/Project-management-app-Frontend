import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { useCsrfToken } from './use-csrf-token'

type LoginProps = {
  email: string
  password: string
}

export const useAuth = () => {
  const router = useRouter()
  const { csrfToken, getCsrfToken } = useCsrfToken()

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
        throw new Error('Authentication failed.')
      }
    },
    onSuccess: () => {
      router.push('/')
    },
    onError: (error: Error) => {
      // setError(error.message)
    },
  })

  const { mutate: logout, isPending: isLogoutPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await csrfToken()

      const csrf = getCsrfToken()
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      })
    },
    onSuccess: () => {
      window.location.pathname = '/login'
    },
  })

  return { login, logout }
}
