import { atom, useAtom } from 'jotai'

const modalState = atom(false)

export const useEditTaskSheet = () => {
  return useAtom(modalState)
}
