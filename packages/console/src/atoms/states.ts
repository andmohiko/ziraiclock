import { atom } from 'recoil'

export const LoadingState = atom<boolean>({
  key: 'loading',
  default: false
})
