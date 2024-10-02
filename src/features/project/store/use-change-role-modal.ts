import { atom, useAtom } from 'jotai'

type OpenChangeRoleState = {
  isOpen: boolean,
  id: number | undefined
}

const modalState = atom<OpenChangeRoleState>({
  isOpen: false,
  id: undefined,
})

export const useChangeRoleModal = () => {
  return useAtom(modalState)
}
