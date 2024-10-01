import { atom, useAtom } from 'jotai'

type OpenTaskState = {
  isOpen: boolean,
  id: number | undefined
}

const modalState = atom<OpenTaskState>({
  isOpen: false,
  id: undefined,
})

export const useEditTaskAssignedUserIdSheet = () => {
  return useAtom(modalState)
}
