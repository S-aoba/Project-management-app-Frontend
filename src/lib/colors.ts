import { Task } from '@/types/type'

export const getStatusVariant = ({ status }: Pick<Task, 'status'>) => {
  switch (status) {
    case 'pending':
      return 'pending'
    case 'progress':
      return 'is_progress'
    case 'completed':
      return 'completed'
    default:
      return 'default'
  }
}
