import { Badge } from '@/components/ui/badge'

import { getStatusVariant } from '@/lib/colors'

import { Task } from '@/types/type'

type Props = Pick<Task, 'status'>

export const Status = ({ status }: Props) => {
  const color = getStatusVariant({ status })
  return <Badge variant={color}>{status}</Badge>
}
