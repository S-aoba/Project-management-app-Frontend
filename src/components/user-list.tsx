'use client'

import { Trash, User } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

// import { useConfirm } from '@/hooks/use-confirm'

import { useCurrentUser } from '@/features/auth/api/use-current-user'
import { useProject } from '@/features/project/api/use-project'
import { useChangeRoleModal } from '@/features/project/store/use-change-role-modal'

export const UserList = () => {
  const params = useParams()
  const projectId = Number(params.projectId)

  const { data: currUser } = useCurrentUser()

  const [_open, setOpen] = useChangeRoleModal()

  const { data, isPending } = useProject(projectId)

  const admin = useMemo(() => data?.users.filter((user) => user.role === 'admin')[0], [data?.users])
  const members = useMemo(() => data?.users.filter((user) => user.role === 'member'), [data?.users])

  const isAdmin = useMemo(() => currUser?.id === admin?.id, [data?.users, currUser])

  // const [ConfirDialog, confirm] = useConfirm('Are you sure?', 'You are about to perform a delete action.')
  // const onDelete = async (id: number) => {
  //   const ok = await confirm()
  //   return
  // }

  return (
    <div className='h-full flex flex-col space-y-4 py-8 px-2 w-40'>
      {/* <ConfirDialog /> */}
      <h1 className='text-muted-foreground text-sm'>Member</h1>
      {isPending ? (
        <div className='h-full p-2 space-y-4'>
          <div className='flex w-full space-x-2'>
            <Skeleton className='size-6 rounded-full bg-slate-300' />
            <Skeleton className='w-24 h-6 bg-slate-300' />
          </div>
          <div className='flex w-full space-x-2'>
            <Skeleton className='size-6 rounded-full bg-slate-300' />
            <Skeleton className='w-24 h-6 bg-slate-300' />
          </div>
          <div className='flex w-full space-x-2'>
            <Skeleton className='size-6 rounded-full bg-slate-300' />
            <Skeleton className='w-24 h-6 bg-slate-300' />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <p className='text-lg mb-4'>Admin</p>
            {admin && (
              <div className='flex items-center p-2 text-center'>
                <Avatar className='size-8'>
                  <AvatarImage src='#' />
                  <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className='ml-2 text-muted-foreground text-sm line-clamp-1'>{admin.name}</p>
              </div>
            )}
          </div>
          <div className='mt-2'>
            <p className='text-lg mb-4'>Members</p>
            <div className='flex flex-col space-y-4'>
              {members &&
                members.map((member) =>
                  isAdmin ? (
                    <DropdownMenu key={member.id}>
                      <DropdownMenuTrigger>
                        <div className='flex items-center p-2 text-center rounded-md group hover:cursor-pointer hover:bg-muted transition-colors duration-300'>
                          <Avatar className='size-8'>
                            <AvatarImage src='#' />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className='ml-2 text-muted-foreground group-hover:text-black text-sm transition-colors duration-300 line-clamp-1'>
                            {member.name}
                          </p>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>{member.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setOpen({
                              isOpen: true,
                              id: member.id,
                            })
                          }}>
                          <User className='size-4 mr-2' />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {}}>
                          <Trash className='size-4 mr-2' />
                          remove user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className='flex items-center p-2 text-center' key={member.id}>
                      <Avatar className='size-8'>
                        <AvatarImage src='#' />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className='ml-2 text-muted-foreground text-sm line-clamp-1'>{member.name}</p>
                    </div>
                  ),
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
