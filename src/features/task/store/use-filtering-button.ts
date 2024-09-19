import { atom, useAtom } from 'jotai'

const filteringButtonState = atom({
  status:'',
  priority: ''
})

export const useFilteringButton = () => {
  return useAtom(filteringButtonState)
}
