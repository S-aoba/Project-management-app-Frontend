import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useCsrfToken } from '@/features/auth/api/use-csrf-token'

import { Task } from '@/types/type'
import { toast } from 'sonner'

type RequestType = Pick<
  Task,
  'name' | 'description' | 'status' | 'dueDate' | 'imagePath' | 'assignedUserId' | 'priority' | 'projectId'
>

export const useEditTask = (taskId: number | undefined) => {
  const queryClient = useQueryClient()

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const editTask = async ({ ...props }: RequestType) => {
    await csrfToken()

    const csrf = getCsrfToken()

    const taskData = {
      name: props.name,
      description: props.description,
      due_date: props.dueDate,
      status: props.status,
      image_path: props.imagePath,
      priority: props.priority,
      assigned_user_id: props.assignedUserId,
      project_id: props.projectId,
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/tasks/${taskId}`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(taskData),
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
    mutationKey: ['editTask', taskId],
    mutationFn: (props: RequestType) => editTask(props),
    onSuccess(_, variables) {
      queryClient.invalidateQueries({ queryKey: ['userProjects'] })

      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] })

      toast.success('Task edited successfully.')
    },
  })

  return { mutate, isPending }
}
