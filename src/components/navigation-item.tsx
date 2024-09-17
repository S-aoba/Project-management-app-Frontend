'use clietn'

import { cn } from '@/lib/utils'
import { Folder } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export const NavigationItem = ({ name, id }: { name: string; id: number }) => {
  const params = useParams()
  const projectId = Number(params.projectId)

  return (
    <Link href={`/projects/${id}`} className='w-full'>
      <div
        className={cn(
          'p-2 text-center rounded-md group hover:cursor-pointer hover:bg-muted transition-colors duration-300 flex items-center justify-center text-white',
          projectId === id && ' bg-white text-black hover:bg-white',
        )}>
        <div className='w-4/5 flex items-center justify-start'>
          <Folder className='size-6 mr-2 group-hover:text-black transition-colors duration-300' />
          <p className='w-40 group-hover:text-black text-sm transition-colors duration-300 truncate'>{name}</p>
        </div>
      </div>
    </Link>
  )
}
