import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useCsrfToken } from '@/features/auth/api/use-csrf-token'

export const useDeleteTask = (projectId: number) => {
  const queryClient = useQueryClient()

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const deleteTask = async (taskId: number) => {
    await csrfToken()

    const csrf = getCsrfToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/tasks/${taskId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-XSRF-TOKEN': csrf!,
      },
    })

    if (!res.ok) {
      throw new Error('Delete task failed.')
    }

    return res.json()
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: deleteTask,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    },
    onError(error: Error) {
      toast.error(error.message)
    },
  })

  return { mutate, isPending }
}
