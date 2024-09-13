'use client'

import { useEffect, useState } from 'react'

import { EditProjectSheet } from '@/features/project/components/edit-project-sheet'
import { EditTaskSheet } from '@/features/task/components/edit-task-sheet'

export const Sheets = () => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <EditProjectSheet />

      <EditTaskSheet />
    </>
  )
}
