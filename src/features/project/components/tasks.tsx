'use client'

import { Loader2, Plus } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'

import { useCreateTaskModal } from '@/features/task/store/use-create-task-modal'

import { useProject } from '../api/use-project'

export const Tasks = () => {
  const params = useParams()
  const projectId = Number(params.projectId)

  const { data, isPending } = useProject(projectId)

  const [_, setOpen] = useCreateTaskModal()

  return (
    <div className='h-full flex flex-col space-y-4 items-start'>
      <div className='pt-4'>
        <p className='text-2xl'>Task</p>
      </div>

      <div className='w-full flex space-x-4'>
        <Button
          className='bg-gray-700/80 hover:bg-gray-800/80'
          onClick={() => {
            setOpen(true)
          }}>
          <Plus className='size-4 mr-2' />
          Task
        </Button>
      </div>
      <div className='h-full w-full flex justify-start items-start'>
        {isPending ? (
          <Loader2 className='size-8 text-slate-300 animate-spin' />
        ) : (
          <DataTable columns={columns} data={data!.tasks} filterKey='name' />
        )}
      </div>
    </div>
  )
}
