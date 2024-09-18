// import { UserList } from '@/components/user-list'
import { UserList } from '@/components/user-list'
import { ProjectInfomation } from '@/features/project/components/project-information'

export default function ProjectDetailPage() {
  return (
    <div className='h-full w-full grid grid-cols-12 gap-x-4'>
      <ProjectInfomation />
      <UserList />
    </div>
  )
}
