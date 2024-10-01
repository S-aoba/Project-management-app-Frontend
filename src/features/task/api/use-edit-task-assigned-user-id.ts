import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useCsrfToken } from '@/features/auth/api/use-csrf-token'

type RequestType = {
  newAssignedUserId: number
}

type Props = {
  taskId: number | undefined
  projectId: number | undefined
}

export const useEditTaskAssignedUserId = ({ taskId, projectId }: Props) => {
  const queryClient = useQueryClient()

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const editTask = async ({ ...props }: RequestType) => {
    await csrfToken()

    const csrf = getCsrfToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/tasks/${taskId}/assigned_user_id`, {
      method: 'PATCH',
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
    mutationKey: ['editTask', taskId],
    mutationFn: (props: RequestType) => editTask(props),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    },
  })

  return { mutate, isPending }
}
