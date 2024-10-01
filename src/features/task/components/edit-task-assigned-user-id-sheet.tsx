'use clietn'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

import { useProject } from '@/features/project/api/use-project'

import { cn } from '@/lib/utils'
import { User } from '@/types/type'
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
  const [__userList, setUserList] = useState<User[]>([])

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (data && open.id) {
      data.tasks.map((item) => {
        if (item.id === open.id) {
          setAssignedUserId(item.assignedUserId)
        }
      })
      setUserList(data.users)
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
    <Dialog open={open.isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task Assigned User ID</DialogTitle>
          {error && (
            <div>
              <p className='text-sm text-red-500'>{error}</p>
            </div>
          )}
          <DialogDescription />
        </DialogHeader>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='flex justify-end space-x-4'>
            <Button variant={'outline'} type='button' disabled={isPending} onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button disabled={isPending}>Edit</Button>
          </div>
          <div className='w-full max-w-md mx-auto bg-card rounded-lg shadow-lg overflow-hidden'>
            <div className='p-4 bg-muted'>
              <h2 className='text-lg font-semibold text-foreground'>Project Participants</h2>
              <p className='text-sm text-muted-foreground'>
                {data?.users.length} {data?.users.length === 1 ? 'member' : 'members'}
              </p>
            </div>
            <ScrollArea className='h-[300px]'>
              <ul className='divide-y divide-border'>
                {data?.users.map((user) => (
                  <li
                    key={user.id}
                    className={cn('flex justify-start hover:bg-muted/50 transition-colors duration-300')}>
                    <Button
                      type='button'
                      variant={'ghost'}
                      onClick={() => setAssignedUserId(user.id)}
                      className={cn(
                        user.id === assignedUserId && 'bg-blue-500/60 hover:bg-blue-500/60',
                        'w-full h-full p-4 rounded-none',
                      )}>
                      <div className='flex w-full items-center justify-start space-x-4'>
                        <Avatar>
                          <AvatarImage src={'#'} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className='text-sm font-medium text-foreground'>{user.name}</p>
                        <p className='text-xs text-muted-foreground'>{user.role}</p>
                      </div>
                      <Badge variant='secondary'>{user.role}</Badge>
                    </Button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
