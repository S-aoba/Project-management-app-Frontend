'use client'

import { EditIcon, EllipsisVertical, Trash2 } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { toast } from 'sonner'



import { Status } from '@/components/status'

import { useDeleteTask } from '@/features/task/api/use-delete-task'
import { useEditTaskSheet } from '@/features/task/store/use-edit-task-sheet'

import { useConfirm } from '@/hooks/use-confirm'

import { Priority } from '@/features/task/components/priority'
import { Task } from '@/types/type'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const Action = ({id, projectId} : {id: number, projectId: number}) => {
  const [ConfirmDialog, confirm] = useConfirm('Are you sure?', 'You are about to perform a delete action.')
  const [_, setOpen] = useEditTaskSheet()

  const { mutate } = useDeleteTask(projectId)

  const handleDelete = async () => {
    const ok = await confirm()

    if (ok) {
      mutate(id)
      toast.success('Task deleted successfully.')
    }
  }
  return (
    <>
          <ConfirmDialog />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className='size-8 hover:bg-slate-200 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-300'>
                <EllipsisVertical className='size-4 text-slate-400' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Setting</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  setOpen({
                    isOpen: true,
                    id: id,
                  })
                }>
                <EditIcon className='size-4 text-slate-400 mr-2' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                <Trash2 className='size-4 text-slate-400 mr-2' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
  )
}