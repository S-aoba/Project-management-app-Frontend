'use client'

import { useEffect, useState } from 'react'

import { CreateProjectModal } from '@/features/project/components/create-project-modal'
import { CreateTaskModal } from '@/features/task/components/create-task-modal'

export const Modals = () => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <CreateProjectModal />

      <CreateTaskModal />
    </>
  )
}
