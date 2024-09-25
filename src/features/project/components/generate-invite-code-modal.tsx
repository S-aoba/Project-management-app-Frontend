'use client'

import { useParams } from 'next/navigation'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { useInviteCode } from '../api/use-invite-code'

import { useGenerateInviteCodeModal } from '../store/use-generate-invite-code-modal'

export const GenerateInviteCodeModal = () => {
  const params = useParams()
  const projectId = Number(params.projectId)

  const [open, setOpen] = useGenerateInviteCodeModal()

  const [inviteCode, setInviteCode] = useState<{ data: string; message: string } | null>(null)
  // const [error, setError] = useState<{ error: string; message: string } | null>(null)

  const { mutate } = useInviteCode({ setInviteCode })

  const handleClose = () => {
    setOpen(false)

    setInviteCode(null)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate({
      projectId,
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Invite Code</DialogTitle>
          <DialogDescription />
          <form className='flex items-center space-x-4' onSubmit={handleSubmit}>
            <Input
              readOnly
              name={'invitecode'}
              value={inviteCode?.data ? inviteCode.data : ''}
              disabled={false}
              required
              autoFocus
              minLength={3}
              placeholder='Invite code'
              onChange={() => {}}
            />
            <Button type='submit' disabled={false}>
              Generate
            </Button>
          </form>
          <div className='text-sm'>{inviteCode?.message}</div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
