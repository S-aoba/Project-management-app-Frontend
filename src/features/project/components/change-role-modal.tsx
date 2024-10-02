'use client'

import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useChangeRole } from '../api/use-change-role'
import { useChangeRoleModal } from '../store/use-change-role-modal'

import { useCurrentUser } from '@/features/auth/api/use-current-user'

export const ChangeRoleModal = () => {
  const params = useParams()
  const projectId = Number(params.projectId)

  const [role, setRole] = useState<'admin' | undefined>(undefined)
  const [error, setError] = useState('')

  const [open, setOpen] = useChangeRoleModal()

  const { data: user } = useCurrentUser()
  const { mutate, isPending } = useChangeRole({ setError })

  const handleClose = () => {
    setOpen({
      isOpen: false,
      id: undefined,
    })

    setTimeout(() => {
      setError('')
      setRole(undefined)
    }, 500)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (user && open.id) {
      mutate(
        {
          projectId,
          userId: open.id,
        },
        {
          onSuccess(data) {
            handleClose()

            toast.success(data.message)
          },
        },
      )
    }
  }

  return (
    <Dialog open={open.isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Role</DialogTitle>
          <DialogDescription className='text-red-500 py-4'>
            Are you sure you want to change this role? This action cannot be undone.
          </DialogDescription>
          <div className='text-sm text-red-500'>{error}</div>
          <form className='flex items-center space-x-4' onSubmit={handleSubmit}>
            <Select
              value={role}
              name={'role'}
              onValueChange={(e) => {
                setRole(e as 'admin')
              }}
              required>
              <SelectTrigger>
                <SelectValue placeholder='Select Role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='admin'>Admin</SelectItem>
              </SelectContent>
            </Select>
            <Button type='submit' disabled={isPending} size={'sm'}>
              Change Role
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
