import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useCsrfToken } from '@/features/auth/api/use-csrf-token'

type RequestType = {
  projectId: number
  userId: number
}

type ResponseType = {
  message: string
}

type Props = {
  setError: React.Dispatch<React.SetStateAction<string>>
}

export const useRemoveMember = ({ setError }: Props) => {
  const queryClient = useQueryClient()

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const fetchInvitecode = async ({ ...props }: RequestType): Promise<ResponseType> => {
    await csrfToken()

    const csrf = getCsrfToken()

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/projects/${props.projectId}/users/${props.userId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      },
    )

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("It looks like the user doesn't exist. Please verify the username or ID.")
      }

      const error = await res.json()

      throw new Error(error.message)
    }

    return res.json()
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (props: RequestType) => fetchInvitecode(props),
    onSuccess(_, variables) {
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] })
    },
    onError(error) {
      setError(error.message)
    },
  })
  return { mutate, isPending }
}
