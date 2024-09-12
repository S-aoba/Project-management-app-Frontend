
import { ProjectHeader } from './project-header'
import { Tasks } from './tasks'

export const ProjectInfomation = () => {
  return (
    <div className='flex-grow flex flex-col'>
      <ProjectHeader />
      <Tasks />
    </div>
  )
}