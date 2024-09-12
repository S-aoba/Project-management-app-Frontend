import { UserList } from '@/components/user-list'
import { ProjectInfomation } from '@/features/project/components/project-information'

export default function ProjectDetailPage() {
  return (
    <div className='h-full flex-grow flex justify-between'>
      <ProjectInfomation />
      <UserList />
    </div>
  )
}
