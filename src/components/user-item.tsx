
import { Trash } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = {
  id: number
  name: string
  onDelete: (id: number) => void
}

export const UserItem = ({ id, name, onDelete }: Props) => {
  return (
    <div className='flex items-center p-2 text-center rounded-md group hover:cursor-pointer hover:bg-muted transition-colors duration-300'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className='size-6 border border-slate-500'>
            <AvatarImage src='#' />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <p className='ml-2 text-muted-foreground group-hover:text-black text-sm transition-colors duration-300 line-clamp-1'>
          {name}
        </p>
        <DropdownMenuContent>
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {}}>
            <Trash className='size-4 mr-2' />
            remove user
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}