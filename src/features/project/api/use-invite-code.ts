import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useCsrfToken } from '@/features/auth/api/use-csrf-token'

type RequestType = {
  projectId: number
}

type ResponseType = {
  data: string
  message: string
}

type Props = {
  setInviteCode: React.Dispatch<
    React.SetStateAction<{
      data: string
      message: string
    } | null>
  >
}

export const useInviteCode = ({ setInviteCode }: Props) => {
  const queryClient = useQueryClient()

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const fetchInvitecode = async ({ ...props }: RequestType): Promise<ResponseType> => {
    await csrfToken()

    const csrf = getCsrfToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/invite_code`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(props),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-XSRF-TOKEN': csrf!,
      },
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(JSON.stringify(error))
    }

    return res.json()
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ['invitecode'],
    mutationFn: (props: RequestType) => fetchInvitecode(props),
    onSuccess(data) {
      setInviteCode(data)
    },
  })
  return { mutate, isPending }
}
