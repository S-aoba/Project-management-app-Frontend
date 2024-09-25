import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useCsrfToken } from '@/features/auth/api/use-csrf-token'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type RequestType = {
  inviteCode: string
  userId: number
}

type ResponseType = {
  projectId: number
  message: string
}

type Props = {
  setError: React.Dispatch<React.SetStateAction<string>>
}

export const useSubmitInviteCode = ({ setError }: Props) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const fetchInvitecode = async ({ ...props }: RequestType): Promise<ResponseType> => {
    await csrfToken()

    const csrf = getCsrfToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/invite_code/${props.inviteCode}`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ userId: props.userId }),
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

  const { mutate, isPending } = useMutation({
    mutationFn: (props: RequestType) => fetchInvitecode(props),
    onSuccess(data) {
      toast.success(data.message)

      router.push(`/projects/${data.projectId}`)

      queryClient.invalidateQueries({ queryKey: ['userProjects'] })
    },
    onError(error: Error) {
      setError(error.message)
    },
  })
  return { mutate, isPending }
}
