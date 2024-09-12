'use clietn'

import { useParams } from 'next/navigation'

import { Skeleton } from '@/components/ui/skeleton'

// import { useConfirm } from '@/hooks/use-confirm'

import { UserItem } from '@/app/user-item'
import { useProject } from '@/features/project/api/use-project'

export const UserList = () => {
  const params = useParams()
  const projectId = Number(params.projectId)

  const { data, isPending } = useProject(projectId)

  // const [ConfirDialog, confirm] = useConfirm('Are you sure?', 'You are about to perform a delete action.')
  const onDelete = async (id: number) => {
    const ok = await confirm()
    return
  }

  return (
    <div className='h-full flex flex-col space-y-4 py-8 px-2 w-40 border-l'>
      {/* <ConfirDialog /> */}
      <h1 className='text-muted-foreground text-sm'>Participating User List</h1>
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
        data?.users.map((user) => <UserItem key={user.id} id={user.id} name={user.name} onDelete={onDelete} />)
      )}
    </div>
  )
}
