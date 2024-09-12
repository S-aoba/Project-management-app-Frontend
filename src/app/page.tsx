'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import { useProjects } from '@/features/project/api/use-projects'
import { useCreateProjectModal } from '@/features/project/store/use-create-project-modal'

export default function Home() {
  const router = useRouter()

  const [open, setOpen] = useCreateProjectModal()

  const { data, isLoading } = useProjects()

  const projectId = useMemo(() => data?.data[0]?.id, [data])

  useEffect(() => {
    if (isLoading) return

    if (projectId) {
      router.replace(`/projects/${projectId}`)
    } else if (!open) {
      /**
       * 依存配列からopenを削除している理由は、Projectの作成後のモーダルを閉じる挙動によって、
       * 発火してしまい、再びモーダルが開いてしまう挙動を防ぐ為
       * ただし、他により良い方法があれば、そちらを採用する
       */
      setOpen((open) => !open)
    }
  }, [projectId, router, isLoading])
}
