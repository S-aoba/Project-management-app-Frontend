import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useCsrfToken } from '@/features/auth/api/use-csrf-token'

import { Project } from '@/types/type'

type RequestType = Pick<Project, 'name' | 'description' | 'status' | 'dueDate' | 'imagePath'>
type ResponseType = {
  data: Project
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const createProject = async ({ ...props }: RequestType): Promise<ResponseType> => {
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
      const error = await res.json()
      throw new Error(JSON.stringify(error))
    }

    return res.json()
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ['creatProject'],
    mutationFn: (props: RequestType) => createProject(props),
    onSuccess(data) {
      const newData: Project = data.data
      const cacheData = queryClient.getQueryData<{ data: Project[] }>(['userProjects'])

      if (cacheData?.data === undefined) throw new Error('something went wrong.')

      const updater = { data: [...cacheData.data, newData] }

      queryClient.setQueryData<{ data: Project[] }>(['userProjects'], updater)
    },
  })
  return { mutate, isPending }
}
