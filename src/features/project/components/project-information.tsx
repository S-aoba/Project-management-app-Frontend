import { ProjectHeader } from './project-header'
import { Tasks } from './tasks'

export const ProjectInfomation = () => {
  return (
    <div className='col-span-11 w-full flex flex-col mr-8 p-8'>
      <ProjectHeader />
      <Tasks />
    </div>
  )
}
