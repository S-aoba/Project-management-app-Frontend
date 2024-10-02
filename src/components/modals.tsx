'use client'

import { useEffect, useState } from 'react'

import { CreateProjectModal } from '@/features/project/components/create-project-modal'
import { CreateTaskModal } from '@/features/task/components/create-task-modal'

import { GenerateInviteCodeModal } from '@/features/project/components/generate-invite-code-modal'
import { SubmitInviteCodeModal } from '@/features/project/components/submit-invite-code-modal'
import { ChangeRoleModal } from '@/features/project/components/change-role-modal'

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

      <GenerateInviteCodeModal />
      <SubmitInviteCodeModal />

      <ChangeRoleModal />
    </>
  )
}
