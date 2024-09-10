import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useCsrfToken } from '@/features/auth/api/use-csrf-token'

import { Project } from '@/types/type'

type RequestType = Pick<Project, 'name' | 'description' | 'status' | 'dueDate' | 'imagePath'>

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const { mutate, isPending } = useMutation({
    mutationKey: ['creatProject'],
    mutationFn: async ({ ...props }: RequestType) => {
      await csrfToken()

      const csrf = getCsrfToken()

      const projectData = {
        name: props.name,
        description: props.description,
        due_date: props.dueDate,
        status: props.status,
        image_path: props.imagePath,
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/projects`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(projectData),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      })

      if (!res.ok) {
        throw new Error('Unauthenticated.')
      }

      return await res.json()
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['userProjects'],
      })
    },
  })
  return { mutate, isPending }
}
