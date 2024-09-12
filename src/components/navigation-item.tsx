import Link from 'next/link'

export const NavigationItem = ({ name, id }: { name: string; id: number }) => {
  return (
    <Link href={`/projects/${id}`}>
      <div className='p-2 text-center rounded-md group border hover:cursor-pointer hover:bg-muted transition-colors duration-300'>
        <p className='text-muted-foreground group-hover:text-black text-sm transition-colors duration-300 line-clamp-1'>
          {name}
        </p>
      </div>
    </Link>
  )
}
