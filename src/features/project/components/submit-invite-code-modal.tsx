'use client'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useCurrentUser } from '@/features/auth/api/use-current-user'
import { useSubmitInviteCode } from '../api/use-submit-invite-code'
import { useSubmitInviteCodeModal } from '../store/use-submit-invite-code-modal'

export const SubmitInviteCodeModal = () => {
  const [inviteCode, setInviteCode] = useState('')

  const [open, setOpen] = useSubmitInviteCodeModal()

  const { data: user } = useCurrentUser()
  const { mutate } = useSubmitInviteCode()

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (user) {
      mutate({
        inviteCode,
        userId: user.id,
      })
    }

    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Invite Code</DialogTitle>
          <DialogDescription />
          <form className='flex items-center space-x-4' onSubmit={handleSubmit}>
            <Input
              name={'invitecode'}
              value={inviteCode}
              disabled={false}
              required
              placeholder='Enter the invite code'
              onChange={(e) => setInviteCode(e.target.value)}
            />
            <Button type='submit' disabled={false} size={'sm'}>
              submit
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
