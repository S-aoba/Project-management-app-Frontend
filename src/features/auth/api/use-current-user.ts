import { useQuery } from '@tanstack/react-query'
import { useCsrfToken } from './use-csrf-token'
import { User } from '@/types/type'

export const useCurrentUser = () => {
  const { csrfToken, getCsrfToken } = useCsrfToken()

  const fetchCurrentUser = async () => {
    await csrfToken()

    const csrf = getCsrfToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user`, {
      method: 'GET',
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

    return res.json()
  }

  const { data, isPending } = useQuery<User>({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
    staleTime: Infinity,
  })


  return { data, isPending }
}
