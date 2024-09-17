'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

import { useConfirm } from '@/hooks/use-confirm'

import { useDeleteProject } from '../api/use-delete-project'
import { useProject } from '../api/use-project'

import { useEditProjectSheet } from '../store/use-edit-project-sheet'

export const ProjectHeader = () => {
  const queryClient = useQueryClient()

  const params = useParams()
  const projectId = Number(params.projectId)

  const { data, isPending } = useProject(projectId)

  const { mutate, isPending: isDeletePending } = useDeleteProject()

  const [ConfirmDialog, confirm] = useConfirm('Are you sure?', 'You are about to perform a delete action.')
  const [_open, setOpen] = useEditProjectSheet()

  const handleDelete = async () => {
    const ok = await confirm()

    if (ok) {
      mutate(projectId, {
        onSuccess() {
          /**
           * delete projectのonSuccessで削除対象のprojectのキャッシュを削除してしまうと
           * 再フェッチが走ってしまってエラーになるので、mutateの後にキャッシュの削除を行うことにした。
           */
          queryClient.removeQueries({ queryKey: ['project', projectId] })
          toast.success('Project deleted successfully.')
        },
        onError(error) {
          toast.error(error.message)
        },
      })
    }
  }

  return (
    <>
      <ConfirmDialog />
      {isPending ? (
        <div className='py-8 border-b'>
          <div className='flex items-center justify-start space-x-4 border-b px-2 pb-2'>
            <Skeleton className='w-20 h-4 bg-slate-300' />
            <Skeleton className='w-20 h-4 bg-slate-300' />
            <Skeleton className='w-20 h-4 bg-slate-300' />
            <Button disabled={isPending} size={'sm'} variant={'outline'}>
              Edit Project
            </Button>
            <Button disabled={isPending} size={'sm'} variant={'destructive'}>
              Delete Project
            </Button>
          </div>
          <div className='space-y-2 mt-4 p-2'>
            <h2 className='text-xl font-semibold mb-2'>概要</h2>
            <Skeleton className='w-20 h-4 bg-slate-300' />
            <Skeleton className='w-36 h-4 bg-slate-300' />
            <Skeleton className='w-56 h-4 bg-slate-300' />
          </div>
        </div>
      ) : (
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl text-foreground'>{data?.project.name}</h1>
            <DropdownMenu>
              <DropdownMenuTrigger className='hover:bg-gray-100 p-2 rounded-full transition-colors duration-300'>
                <EllipsisVertical className='size-4' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Edit className='size-4' />
                  <Button
                    disabled={isPending || isDeletePending}
                    size={'sm'}
                    variant={'ghost'}
                    onClick={() => setOpen(true)}>
                    Edit
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className='size-4' />
                  <Button disabled={isPending || isDeletePending} size={'sm'} variant={'ghost'} onClick={handleDelete}>
                    Delete
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='flex space-x-4 items-center'>
            <div className='felx items-center'>
              <span className='text-sm'>Status: </span>
              <Badge variant={'default'}>{data?.project.status}</Badge>
            </div>
            <p className='text-sm'>Created on: {data?.project.dueDate}</p>
          </div>
          <div className='indent-1 line-clamp-2'>
            <p>{data?.project.description}</p>
          </div>
        </div>
      )}
    </>
  )
}
