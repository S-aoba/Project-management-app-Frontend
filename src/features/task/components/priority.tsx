import { Task } from '@/types/type'
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react'

export const Priority = ({ priority }: Pick<Task, 'priority'>) => {
  return (
    <div className='flex items-center'>
      {priority === 'low' && <ArrowDown className='size-4 text-gray-800/60' />}
      {priority === 'medium' && <ArrowRight className='size-4 text-gray-800/60' />}
      {priority === 'high' && <ArrowUp className='size-4 text-gray-800/60' />}
      <span className='text-sm ml-1 capitalize'>{priority}</span>
    </div>
  )
}
