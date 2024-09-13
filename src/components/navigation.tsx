'use client'

import { LogOut, Plus } from 'lucide-react'

import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

import { NavigationItem } from './navigation-item'

import { useAuth } from '@/features/auth/api/use-auth'
import { useProjects } from '@/features/project/api/use-projects'
import { useCreateProjectModal } from '@/features/project/store/use-create-project-modal'

export const Navigation = () => {
  const { data, isLoading } = useProjects()

  const [_open, setOpen] = useCreateProjectModal()

  const { logout, isLogoutPending } = useAuth()

  return (
    <div className='h-full flex flex-col py-8 px-2 w-60 border-r'>
      <div className='flex flex-col flex-1 space-y-4'>
        <Button onClick={() => setOpen(true)} disabled={isLogoutPending}>
          <div className='flex items-center justify-center'>
            <Plus className='size-4 mr-2' />
            <span className='text-sm'>Create Project</span>
          </div>
        </Button>
        <hr className='border-foreground' />

        {isLoading ? (
          <>
            <Skeleton className='w-full h-10 bg-slate-300' />
            <Skeleton className='w-full h-10 bg-slate-300' />
            <Skeleton className='w-full h-10 bg-slate-300' />
          </>
        ) : (
          data?.data.map((project) => {
            return <NavigationItem key={project.id} name={project.name} id={project.id} />
          })
        )}
      </div>
      <Button variant={'outline'} className='mt-auto' onClick={() => logout()} disabled={isLogoutPending}>
        <div className='flex items-center justify-center'>
          <LogOut className='size-4 mr-2' />
          <span className='text-sm'>Logout</span>
        </div>
      </Button>
    </div>
  )
}
