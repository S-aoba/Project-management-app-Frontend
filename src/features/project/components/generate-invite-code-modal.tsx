'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { ActionError } from '@/components/action-error'

import { ValidationErrorType } from '@/types/type'
import { useGenerateInviteCodeModal } from '../store/use-generate-invite-code-modal'

export const GenerateInviteCodeModal = () => {
  const router = useRouter()

  const [open, setOpen] = useGenerateInviteCodeModal()

  const [errors, setErrors] = useState<ValidationErrorType | null>(null)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Invite Code</DialogTitle>
          {errors && <ActionError {...errors} />}
          <DialogDescription />
          <form className='flex items-center space-x-4' onSubmit={handleSubmit}>
            <Input
              name={''}
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
