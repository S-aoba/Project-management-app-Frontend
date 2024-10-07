'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { ActionError } from '@/components/action-error'

import { useCreateTask } from '../api/use-create-task'
import { useCreateTaskModal } from '../store/use-create-task-modal'

import { ValidationErrorType } from '@/types/type'

export const CreateTaskModal = () => {
  const params = useParams()
  const projectId = Number(params.projectId)
  const { mutate } = useCreateTask()

  const [open, setOpen] = useCreateTaskModal()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'pending' | 'is_progress' | 'completed'>('pending')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low')
  const [date, setDate] = useState<Date | undefined>(new Date())

  const [errors, setErrors] = useState<ValidationErrorType | null>(null)

  const handleClose = () => {
    setOpen(false)

    setTimeout(() => {
      setName('')
      setDescription('')
      setStatus('pending')
      setErrors(null)
    }, 500)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (date === undefined) return
    const dueDate = format(date, 'yyyy-MM-dd')

    mutate(
      {
        name,
        description,
        status,
        priority,
        imagePath: null,
        dueDate,
        assignedUserId: 1,
        projectId,
      },
      {
        onSuccess() {
          handleClose()

          toast.success('Task created successfully')
        },
        onError(error) {
          console.log(error)

          const errorMessages: ValidationErrorType = JSON.parse(error.message).errors
          setErrors(errorMessages)
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          {errors && <ActionError {...errors} />}
          <DialogDescription />
          <form className='space-y-4' onSubmit={handleSubmit}>
            <Input
              onChange={(e) => setName(e.target.value)}
              name={name}
              disabled={false}
              required
              autoFocus
              minLength={3}
              placeholder='Task name'
            />
            <Input
              onChange={(e) => setDescription(e.target.value)}
              name={description}
              disabled={false}
              minLength={3}
              placeholder='Task Description'
            />
            <Select
              defaultValue={status}
              name={status}
              onValueChange={(e) => setStatus(e as 'pending' | 'is_progress' | 'completed')}
              required>
              <SelectTrigger>
                <SelectValue placeholder='Task Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='pending'>pending</SelectItem>
                <SelectItem value='is_progress'>is_progress</SelectItem>
                <SelectItem value='completd'>completd</SelectItem>
              </SelectContent>
            </Select>
            <Select
              defaultValue={priority}
              name={priority}
              onValueChange={(e) => setPriority(e as 'low' | 'medium' | 'high')}
              required>
              <SelectTrigger>
                <SelectValue placeholder='Task Priority' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='low'>low</SelectItem>
                <SelectItem value='medium'>medium</SelectItem>
                <SelectItem value='high'>high</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={false}
                  variant={'outline'}
                  className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'yyyy-MM-dd') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            <div className='flex justify-end space-x-4'>
              <Button variant={'outline'} type='button' disabled={false} onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button disabled={false}>Create</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
