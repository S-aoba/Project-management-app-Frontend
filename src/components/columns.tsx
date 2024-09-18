'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from './ui/checkbox'

import { Status } from '@/components/status'

import { Action } from '@/features/task/components/action'
import { Priority } from '@/features/task/components/priority'

import { Task } from '@/types/type'

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
    cell: ({ row }) => <Status status={row.original.status} />,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => <Priority priority={row.original.priority} />,
  },
  {
    accessorKey: 'dueDate',
    header: 'DueDate',
  },
  {
    accessorKey: 'assignedUserId',
    header: 'AssignedUser',
  },
  {
    accessorKey: 'createdAt',
    header: 'CreatedAt',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <Action id={row.original.id} projectId={row.original.projectId} />,
  },
]
