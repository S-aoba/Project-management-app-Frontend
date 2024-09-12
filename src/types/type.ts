export type Project = {
  id: number
  name: string
  description: string | null
  dueDate: string
  status: 'pending' | 'is_progress' | 'completed'
  imagePath: string | null
  createdBy: number
  updatedBy: number
  createdAt: string
  updatedAt: string
}

export type Task = {
  id: number
  name: string
  description: string
  dueDate: string
  status: 'pending' | 'is_progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  imagePath: string | null
  createdBy: number
  updatedBy: number
  createdAt: string
  updatedAt: string
  assignedUserId: number
}

export type User = {
  id: number
  name: string
}
