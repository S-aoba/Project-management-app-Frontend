'use client'

import { useEffect, useState } from 'react'

import { EditProjectSheet } from '@/features/project/components/edit-project-sheet'

export const Sheets = () => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <EditProjectSheet />
    </>
  )
}
