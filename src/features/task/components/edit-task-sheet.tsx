'use clietn'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { useProject } from '@/features/project/api/use-project'

import { ActionError } from '@/components/action-error'

import { useEditTask } from '../api/use-edit-task'
import { useEditTaskSheet } from '../store/use-edit-task-sheet'

import { ValidationErrorType } from '@/types/type'

export const EditTaskSheet = () => {
  const params = useParams()
  const projectId = Number(params.projectId)
  const { data } = useProject(projectId)
  const [open, setOpen] = useEditTaskSheet()
  const { mutate, isPending } = useEditTask(open.id)

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string | null | undefined>(null)
  const [status, setStatus] = useState<'pending' | 'is_progress' | 'completed'>('pending')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low')
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [projectIdState, setProjectId] = useState<number>(0)

  const [errors, setErrors] = useState<ValidationErrorType | null>(null)

  useEffect(() => {
    if (data && open.id) {
      data.tasks.map((item) => {
        if (item.id === open.id) {
          setName(item.name)
          setDescription(item.description)
          setStatus(item.status)
          setDate(new Date(item.dueDate))
          setProjectId(item.projectId)
        }
      })
    }
  }, [data, open.id])

  const handleClose = () => {
    setOpen({ isOpen: false, id: undefined })

    setTimeout(() => {
      setName('')
      setDescription('')
      setStatus('pending')
      setDate(undefined)
      setProjectId(0)
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
        description: description || '',
        status,
        priority,
        imagePath: null,
        dueDate,
        projectId: projectIdState,
      },
      {
        onSuccess() {
          handleClose()

          toast.success('Task edited successfully.')
        },
        onError(error) {
          const errorMessages: ValidationErrorType = JSON.parse(error.message).errors
          setErrors(errorMessages)
        },
      },
    )
  }

  return (
    <Sheet open={open.isOpen} onOpenChange={handleClose}>
      <SheetContent side={'bottom'}>
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>
          {errors && <ActionError {...errors} />}
          <SheetDescription />
        </SheetHeader>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <Input
            value={name}
            name={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder='Task name'
          />
          <Input
            value={description || ''}
            name={description || ''}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isPending}
            minLength={3}
            placeholder='Task Description'
          />
          <Select
            value={status}
            name={status}
            onValueChange={(e) => setStatus(e as 'pending' | 'is_progress' | 'completed')}
            required>
            <SelectTrigger>
              <SelectValue placeholder='Task Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='pending'>pending</SelectItem>
              <SelectItem value='is_progress'>is_progress</SelectItem>
              <SelectItem value='completed'>completed</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={priority}
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
                disabled={isPending}
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
            <Button variant={'outline'} type='button' disabled={isPending} onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button disabled={isPending}>Edit</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
