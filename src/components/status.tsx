import { Badge } from '@/components/ui/badge'

import { getStatusVariant } from '@/lib/colors'

import { Task } from '@/types/type'
import { CircleCheck, CirclePause, Timer } from 'lucide-react'

type Props = Pick<Task, 'status'>

export const Status = ({ status }: Props) => {
  const color = getStatusVariant({ status })
  return (
    <div className='flex items-center'>
      <Badge variant={color}>
        {status === 'pending' && <CirclePause className='size-4 mr-2' />}
        {status === 'is_progress' && <Timer className='size-4 mr-2' />}
        {status === 'completed' && <CircleCheck className='size-4 mr-2' />}
        {status}
      </Badge>
    </div>
  )
}
