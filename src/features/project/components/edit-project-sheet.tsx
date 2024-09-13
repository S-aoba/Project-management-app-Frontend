'use clietn'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { useEditProject } from '../api/use-edit-project'
import { useProject } from '../api/use-project'
import { useEditProjectSheet } from '../store/use-edit-project-sheet'

export const EditProjectSheet = () => {
  const params = useParams()
  const projectId = Number(params.projectId)
  const { data } = useProject(projectId)
  const { mutate, isPending } = useEditProject(projectId)

  const [open, setOpen] = useEditProjectSheet()

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string | null | undefined>(null)
  const [status, setStatus] = useState<'pending' | 'is_progress' | 'completed'>('pending')
  const [date, setDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    if (data) {
      setName(data.project.name)
      setDescription(data.project.description)
      setStatus(data.project.status)
      setDate(new Date(data.project.dueDate))
    }
  }, [data])

  const handleClose = () => {
    setName('')
    setDescription('')
    setStatus('pending')
    setDate(undefined)

    setOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (date === undefined) return
    const dueDate = format(date, 'yyyy-MM-dd')

    mutate({
      name,
      description: description || '',
      status,
      dueDate,
      imagePath: null,
    })

    handleClose()
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side={'bottom'}>
        <SheetHeader>
          <SheetTitle>Edit Project</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <Input
            defaultValue={data?.project.name}
            name={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder='Project name'
          />
          <Input
            defaultValue={data?.project.description || ''}
            name={description || ''}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isPending}
            required
            minLength={3}
            placeholder='Project Description'
          />
          <Select
            defaultValue={status}
            name={status}
            onValueChange={(e) => setStatus(e as 'pending' | 'is_progress' | 'completed')}
            required>
            <SelectTrigger>
              <SelectValue placeholder='Project Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='pending'>pending</SelectItem>
              <SelectItem value='is_progress'>is_progress</SelectItem>
              <SelectItem value='completed'>completed</SelectItem>
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
