import { useQuery } from '@tanstack/react-query'

import { useCsrfToken } from '@/features/auth/api/use-csrf-token'

import { Project, Task, User } from '@/types/type'

type ResponseType = {
  project: Project
  tasks: Task[]
  users: User[]
}

export const useProject = (projectId: number) => {
  const { csrfToken, getCsrfToken } = useCsrfToken()

  const fetchProject = async () => {
    await csrfToken()

    const csrf = getCsrfToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/projects/${projectId}`, {
      method: 'GET',
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

  const { data, isPending } = useQuery<ResponseType>({
    queryKey: ['project', projectId],
    enabled: !!projectId,
    queryFn: fetchProject,
  })

  return { data, isPending }
}
