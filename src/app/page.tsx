'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import { useProjects } from '@/features/project/api/use-projects'
import { useCreateProjectModal } from '@/features/project/store/use-create-project-modal'

export default function Home() {
  const router = useRouter()

  const [open, setOpen] = useCreateProjectModal()

  const { data, isLoading } = useProjects()

  const projectId = useMemo(() => data?.data[0]?.id, [data])

  useEffect(() => {
    if (isLoading) return

    if (projectId) {
      router.replace(`/projects/${projectId}`)
    } else if (!open) {
      setOpen(true)
    }
  }, [projectId, open, setOpen, router, isLoading])
}
