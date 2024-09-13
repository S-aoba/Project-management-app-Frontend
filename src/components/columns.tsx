'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from './ui/checkbox'

import { Task } from '@/types/type'
import { EllipsisVertical } from 'lucide-react'

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'dueDate',
    header: 'DueDate',
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
  },
  {
    accessorKey: 'assignedUserId',
    header: 'AssignedUser',
  },
  {
    accessorKey: 'createdBy',
    header: 'CreatedBy',
  },
  {
    accessorKey: 'createdAt',
    header: 'CreatedAt',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: () => {
      return (
        <div className='size-8 hover:bg-slate-200 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-300'>
          <EllipsisVertical className='size-4 text-slate-400' />
        </div>
      )
    },
  },
]
