import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useCsrfToken } from '@/features/auth/api/use-csrf-token'

import { Project } from '@/types/type'

type RequestType = Pick<Project, 'name' | 'description' | 'status' | 'dueDate' | 'imagePath'>

export const useEditProject = (projectId: number) => {
  const queryClient = useQueryClient()

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const editProject = async ({ ...props }: RequestType) => {
    await csrfToken()

    const csrf = getCsrfToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/projects/${projectId}`, {
      method: 'PUT',
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

    return await res.json()
  }
  const { mutate, isPending } = useMutation({
    mutationKey: ['editProject', projectId],
    mutationFn: (props: RequestType) => editProject(props),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['userProjects'] })

      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    },
  })

  return { mutate, isPending }
}
