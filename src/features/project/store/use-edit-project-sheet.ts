import { atom, useAtom } from "jotai"

const sheetState = atom(false)

export const useEditProjectSheet = () => {
  return useAtom(sheetState)
}