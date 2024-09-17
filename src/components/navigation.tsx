'use client'

import { BellIcon, ChevronDown, LogOut, Plus } from 'lucide-react'
import Image from 'next/image'

import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

import { useAuth } from '@/features/auth/api/use-auth'
import { useProjects } from '@/features/project/api/use-projects'
import { useCreateProjectModal } from '@/features/project/store/use-create-project-modal'

import { NavigationItem } from './navigation-item'

export const Navigation = () => {
  const { data, isLoading } = useProjects()

  const [_open, setOpen] = useCreateProjectModal()

  const { logout, isLogoutPending } = useAuth()

  return (
    <div className='h-full w-72 p-3 overflow-y-auto'>
      <div className='h-fit'>
        <div className='flex items-center justify-between p-3 bg-white rounded-xl'>
          <DropdownMenu>
            <DropdownMenuTrigger className='hover:bg-gray-100 p-2 rounded-xl transition-colors duration-300'>
              <div className='flex items-center'>
                <Image src={'/cat-icon.jpg'} alt='userIcon' width={28} height={28} className='rounded-full mr-2' />
                <span className='max-w-32 w-fit text-start text-sm truncate'>aoba_S</span>
                <ChevronDown className='size-4 ml-2' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Button variant={'ghost'} onClick={() => logout()} disabled={isLogoutPending}>
                  <div className='flex items-center justify-center'>
                    <LogOut className='size-4 mr-2' />
                    <span className='text-sm'>Logout</span>
                  </div>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className='p-2 hover:bg-gray-100 rounded-full hover:cursor-pointer transition-colors duration-300'>
            <BellIcon className='size-5 text-slate-500' />
          </div>
        </div>
      </div>
      <hr className='my-6 border-muted' />
      <div className='flex flex-col items-center space-y-4'>
        <Button
          onClick={() => setOpen(true)}
          disabled={isLogoutPending}
          className='w-full bg-gray-700/80 hover:bg-gray-800/80'>
          <div className='flex items-center justify-center'>
            <Plus className='size-4 mr-2' />
          </div>
        </Button>
        {isLoading ? (
          <>
            <Skeleton className='w-full h-10' />
            <Skeleton className='w-full h-10' />
            <Skeleton className='w-full h-10' />
          </>
        ) : (
          data?.data.map((project) => {
            return <NavigationItem key={project.id} name={project.name} id={project.id} />
          })
        )}
      </div>
    </div>
  )
}
