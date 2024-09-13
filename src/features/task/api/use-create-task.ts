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

  const createProject = async ({ ...props }: RequestType) => {
    await csrfToken()

    const csrf = getCsrfToken()

    const taskData = {
      name: props.name,
      description: props.description,
      due_date: props.dueDate,
      status: props.status,
      priority: props.priority,
      image_path: props.imagePath,
      assigned_user_id: props.assignedUserId,
      project_id: props.projectId,
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/tasks`, {
      method: 'POST',
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
    mutationKey: ['createTask'],
    mutationFn: (props: RequestType) => createProject(props),
    onSuccess(_, variables) {
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] })
    },
  })

  return { mutate, isPending }
}
