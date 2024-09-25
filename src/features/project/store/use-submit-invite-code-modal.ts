import { atom, useAtom } from 'jotai'

const modalState = atom(false)

export const useSubmitInviteCodeModal = () => {
  return useAtom(modalState)
}
