import { useCsrfToken } from '@/features/auth/api/use-csrf-token'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteProject = () => {
  const queryClient = useQueryClient()

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const deleteProject = async (projectId: number) => {
    await csrfToken()

    const csrf = getCsrfToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/projects/${projectId}`, {
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

    return await res.json()
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ['deleteProject'],
    mutationFn: (projectId: number) => deleteProject(projectId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['userProjects'] })
    },
  })

  return { mutate, isPending }
}
