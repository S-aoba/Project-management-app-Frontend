'use clietn'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { useProject } from '@/features/project/api/use-project'

import { ActionError } from '@/components/action-error'

import { ValidationErrorType } from '@/types/type'
import { useEditTaskAssignedUserIdSheet } from '../store/use-edit-task-assigned-user-id-sheet'

export const EditTaskAssignedUserIdSheet = () => {
  const params = useParams()
  const projectId = Number(params.projectId)
  const { data } = useProject(projectId)
  const [open, setEditTaskAssignedUserIdSheet] = useEditTaskAssignedUserIdSheet()

  // const { mutate, isPending } = useEditTask(open.id)

  const [assignedUserId, setAssignedUserId] = useState<number>(0)

  const [errors, setErrors] = useState<ValidationErrorType | null>(null)

  useEffect(() => {
    if (data && open.id) {
      data.tasks.map((item) => {
        if (item.id === open.id) {
          setAssignedUserId(item.assignedUserId)
        }
      })
    }
  }, [data, open.id])

  const handleClose = () => {
    setEditTaskAssignedUserIdSheet({ isOpen: false, id: undefined })

    setTimeout(() => {
      setAssignedUserId(0)
      setErrors(null)
    }, 500)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //
  }

  return (
    <Sheet open={open.isOpen} onOpenChange={handleClose}>
      <SheetContent side={'bottom'}>
        <SheetHeader>
          <SheetTitle>Edit Task Assigned User ID</SheetTitle>
          {errors && <ActionError {...errors} />}
          <SheetDescription />
        </SheetHeader>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <Input
            type='number'
            value={assignedUserId}
            name={'assignedUserId'}
            onChange={(e) => {
              setAssignedUserId(Number(e.target.value))
            }}
            disabled={false}
            required
            autoFocus
            minLength={3}
            placeholder='Task Assigned User ID'
          />
          <div className='flex justify-end space-x-4'>
            <Button variant={'outline'} type='button' disabled={false} onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button disabled={false}>Edit</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
