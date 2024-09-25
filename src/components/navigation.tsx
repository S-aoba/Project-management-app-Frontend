'use client'

import { BellIcon, ChevronDown, KeyRound, LogOut, Plus } from 'lucide-react'
import Image from 'next/image'

import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

import { useAuth } from '@/features/auth/api/use-auth'
import { useCurrentUser } from '@/features/auth/api/use-current-user'
import { useProjects } from '@/features/project/api/use-projects'
import { useCreateProjectModal } from '@/features/project/store/use-create-project-modal'

import { NavigationItem } from './navigation-item'
import { useSubmitInviteCodeModal } from '@/features/project/store/use-submit-invite-code-modal'

export const Navigation = () => {
  const { data: user, isPending } = useCurrentUser()
  const { data, isLoading } = useProjects()

  const [_open, setOpen] = useCreateProjectModal()
  const [open, setSubmitInviteCodeModalOpen] = useSubmitInviteCodeModal()

  const { logout, isLogoutPending } = useAuth()

  return (
    <div className='h-full w-72 p-3 overflow-y-auto'>
      <div className='h-fit'>
        <div className='flex items-center justify-between p-3 rounded-xl'>
          <DropdownMenu>
            <DropdownMenuTrigger className='hover:bg-accent p-2 rounded-xl transition-colors duration-300'>
              <div className='flex items-center'>
                {isPending ? (
                  <>
                    <Skeleton className='rounded-full size-7 mr-2' />
                    <Skeleton className='rounded w-16 h-5' />
                  </>
                ) : (
                  <>
                    <Image src={'/cat-icon.jpg'} alt='userIcon' width={28} height={28} className='rounded-full mr-2' />
                    <span className='max-w-32 w-fit text-start text-sm truncate'>{user?.name}</span>
                    <ChevronDown className='size-4 ml-2' />
                  </>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem>
                <Button type='button' variant={'ghost'} onClick={() => {setSubmitInviteCodeModalOpen(true)}} disabled={false}>
                  <div className='flex items-center justify-center'>
                    <KeyRound className='size-4 mr-2' />
                    <span className='text-sm'>Use Invite Code</span>
                  </div>
                </Button>
              </DropdownMenuItem>
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
