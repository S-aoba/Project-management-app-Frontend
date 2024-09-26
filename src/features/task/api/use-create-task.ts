import { useCsrfToken } from '@/features/auth/api/use-csrf-token'
import { Task } from '@/types/type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type RequestType = Pick<
  Task,
  'name' | 'description' | 'status' | 'priority' | 'imagePath' | 'dueDate' | 'assignedUserId' | 'projectId'
>

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const creataTask = async ({ ...props }: RequestType) => {
    await csrfToken()

    const csrf = getCsrfToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/tasks`, {
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
    mutationKey: ['createTask'],
    mutationFn: (props: RequestType) => creataTask(props),
    onSuccess(_, variables) {
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] })
    },
  })

  return { mutate, isPending }
}
