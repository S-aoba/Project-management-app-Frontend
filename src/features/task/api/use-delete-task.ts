import { useCsrfToken } from '@/features/auth/api/use-csrf-token'
import { Task } from '@/types/type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type RequestType = Pick<
  Task,
  'name' | 'description' | 'status' | 'priority' | 'imagePath' | 'dueDate' | 'assignedUserId' | 'projectId'
>

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
      throw new Error('Unauthenticated.')
    }

    return res.json()
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: deleteTask,
    onSuccess() {
      console.log(projectId)

      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    },
  })

  return { mutate, isPending }
}
