import { atom, useAtom } from 'jotai'

const modalState = atom(false)

export const useGenerateInviteCodeModal = () => {
  return useAtom(modalState)
}
