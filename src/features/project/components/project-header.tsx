'use client'

import { useParams } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { Skeleton } from '@/components/ui/skeleton'
import { useProject } from '../api/use-project'

export const ProjectHeader = () => {
  const params = useParams()
  const projectId = Number(params.projectId)

  const { data, isPending } = useProject(projectId)

  return (
    <>
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
        <div className='py-8 border-b'>
          <div className='flex items-center justify-start space-x-4 border-b px-2 pb-2'>
            <h1 className='text-2xl text-foreground'>{data?.project.name}</h1>
            <Badge variant={'default'}>{data?.project.status}</Badge>
            <p className='text-sm text-muted-foreground'>{data?.project.dueDate}</p>
            <Button size={'sm'} variant={'outline'} onClick={() => {}}>
              Edit Project
            </Button>
            <Button size={'sm'} variant={'destructive'} onClick={() => {}}>
              Delete Project
            </Button>
          </div>
          <div className='mt-4 p-2'>
            <h2 className='text-xl font-semibold mb-2'>概要</h2>
            <p className='text-sm text-foreground'>{data?.project.description}</p>
          </div>
        </div>
      )}
    </>
  )
}
