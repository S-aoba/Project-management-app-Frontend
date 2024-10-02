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

export const useChangeRole = ({ setError }: Props) => {
  const queryClient = useQueryClient()

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const fetchInvitecode = async ({ ...props }: RequestType): Promise<ResponseType> => {
    await csrfToken()

    const csrf = getCsrfToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/projects/${props.projectId}/users/${props.userId}/role`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-XSRF-TOKEN': csrf!,
      },
    })

    return res.json()
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (props: RequestType) => fetchInvitecode(props),
    onSuccess(_, variables) {
      queryClient.invalidateQueries({queryKey: ['project', variables.projectId]})
    },
  })
  return { mutate, isPending }
}
