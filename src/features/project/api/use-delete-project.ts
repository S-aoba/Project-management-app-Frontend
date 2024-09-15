import { QueryObserverResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { useCsrfToken } from '@/features/auth/api/use-csrf-token'

import { Project } from '@/types/type'

type ResponseType = Project[]

export const useDeleteProject = () => {
  const router = useRouter()
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
    onSuccess(_, variables) {
      queryClient.invalidateQueries({ queryKey: ['userProjects'] })

      const deleteId = variables
      const cacheDate = queryClient.getQueryData<QueryObserverResult<ResponseType>>(['userProjects'])

      if (cacheDate === undefined || cacheDate.data === undefined) throw new Error('something went wrong.')

      const updater = cacheDate?.data.filter((data) => data.id !== deleteId)
      queryClient.setQueryData<{ data: Project[] }>(['userProjects'], { data: updater })

      const query = queryClient.getQueryData<QueryObserverResult<ResponseType>>(['userProjects'])

      if (query === undefined || query.data === undefined) throw new Error('something went wrong.')

      const len = query.data.length

      if (len <= 1) {
        router.replace('/')
      } else {
        const id = query.data[0].id

        router.push(`/projects/${id}`)
      }
    },
  })

  return { mutate, isPending }
}
