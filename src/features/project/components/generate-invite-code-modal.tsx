'use client'

import { useParams } from 'next/navigation'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { useGenerateInviteCode } from '../api/use-generate-invite-code'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Copy } from 'lucide-react'
import { useGenerateInviteCodeModal } from '../store/use-generate-invite-code-modal'

export const GenerateInviteCodeModal = () => {
  const params = useParams()
  const projectId = Number(params.projectId)

  const [open, setOpen] = useGenerateInviteCodeModal()

  const [copied, setCopied] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [inviteCode, setInviteCode] = useState<{ data: string; message: string } | null>(null)
  const [error, setError] = useState('')

  const { mutate, isPending } = useGenerateInviteCode({ setInviteCode, setError })

  const handleClose = () => {
    setOpen(false)

    setTimeout(() => {
      setInviteCode(null)
      setCopied(false)
      setTooltipOpen(false)
    }, 500)
  }

  const handleCopy = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode.data)
      setCopied(true)
      setTooltipOpen(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setInviteCode(null)
    setCopied(false)
    setTooltipOpen(false)

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
          {inviteCode && <div className='text-sm text-yellow-500/80'>{inviteCode?.message}</div>}
          {error && <div className='text-sm text-red-500'>{error}</div>}
          <form className='flex items-center space-x-4' onSubmit={handleSubmit}>
            <Input
              readOnly
              name={'invitecode'}
              value={inviteCode?.data ? inviteCode.data : ''}
              disabled={true}
              required
              placeholder='Invite code'
            />
            <div className='flex'>
              {inviteCode?.data && (
                <TooltipProvider delayDuration={100}>
                  <Tooltip open={tooltipOpen} onOpenChange={() => setTooltipOpen(!tooltipOpen)}>
                    <TooltipTrigger asChild>
                      <Button type='button' variant={'outline'} className='mr-2' size={'icon'} onClick={handleCopy}>
                        <Copy className='size-4' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{copied ? 'copied!' : 'Click Copy invite code'}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <Button type='submit' disabled={isPending} size={'sm'}>
                Generate
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
