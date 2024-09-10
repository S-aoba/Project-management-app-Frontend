'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { useCreateProject } from '../api/use-create-project'
import { useCreateProjectModal } from '../store/use-create-project-modal'

export const CreateProjectModal = () => {
  const { mutate, isPending } = useCreateProject()

  const [open, setOpen] = useCreateProjectModal()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date | undefined>(new Date())

  const handleClose = () => {
    setName('')
    setDescription('')
    setDate(undefined)

    setOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (date === undefined) return
    const dueDate = format(date, 'yyyy-MM-dd')

    mutate({
      name,
      description,
      status: 'pending',
      dueDate,
      imagePath: null,
    })

    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription />
          <form className='space-y-4' onSubmit={handleSubmit}>
            <Input
              name={name}
              disabled={isPending}
              required
              autoFocus
              minLength={3}
              placeholder='Project name'
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name={description}
              disabled={isPending}
              placeholder='Project description'
              onChange={(e) => setDescription(e.target.value)}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={isPending}
                  variant={'outline'}
                  className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'yyyy-MM-dd') : <span>Pick a dueDate</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            <div className='flex justify-end'>
              <Button type='submit' disabled={isPending}>
                {isPending ? 'Waiting....' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
