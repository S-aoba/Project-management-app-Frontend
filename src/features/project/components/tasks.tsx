'use client'

import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useProject } from '../api/use-project'

export const Tasks = () => {
  const params = useParams()
  const projectId = Number(params.projectId)

  const { data, isPending } = useProject(projectId)

  return (
    <div className='h-full flex flex-col'>
      <div className='border-b p-2'>
        <h1 className='text-2xl'>Tasks</h1>
      </div>
      <div className='h-full p-4 flex flex-col space-y-4'>
        <Input className='w-60' placeholder='Search Task...' />
        <div>
          <Button onClick={() => {}}>Create Task</Button>
        </div>
        {isPending ? (
          <div className='h-full flex items-center justify-center'>
            <Loader2 className='size-8 text-slate-300 animate-spin' />
          </div>
        ) : (
          <DataTable columns={columns} data={data!.tasks} />
        )}
      </div>
    </div>
  )
}