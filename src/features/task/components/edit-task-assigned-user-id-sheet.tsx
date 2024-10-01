'use clietn'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { useProject } from '@/features/project/api/use-project'

import { useEditTaskAssignedUserId } from '../api/use-edit-task-assigned-user-id'
import { useEditTaskAssignedUserIdSheet } from '../store/use-edit-task-assigned-user-id-sheet'

export const EditTaskAssignedUserIdSheet = () => {
  const params = useParams()
  const projectId = Number(params.projectId)
  const { data } = useProject(projectId)
  const [open, setEditTaskAssignedUserIdSheet] = useEditTaskAssignedUserIdSheet()

  const { mutate, isPending } = useEditTaskAssignedUserId({
    taskId: open.id,
    projectId,
  })

  const [assignedUserId, setAssignedUserId] = useState<number>(0)

  const [error, setError] = useState<string | null>(null)

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
      setError(null)
    }, 500)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate(
      {
        newAssignedUserId: assignedUserId,
      },
      {
        onSuccess(data) {
          handleClose()

          toast.success(data.message)
        },
        onError(error) {
          const errorMessage = JSON.parse(error.message).message
          setError(errorMessage)
        },
      },
    )
  }

  return (
    <Sheet open={open.isOpen} onOpenChange={handleClose}>
      <SheetContent side={'bottom'}>
        <SheetHeader>
          <SheetTitle>Edit Task Assigned User ID</SheetTitle>
          {error && (
            <div>
              <p className='text-sm text-red-500'>{error}</p>
            </div>
          )}
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
            disabled={isPending}
            required
            autoFocus
            placeholder='Task Assigned User ID'
          />
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
