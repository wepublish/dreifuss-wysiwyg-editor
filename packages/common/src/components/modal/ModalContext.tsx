import {createContext} from 'react'

interface ModalContextProps {
  toggleMenu: () => void
}

const emptyFn = () => {
  /* do nothing */
}

export const ModalContext = createContext<ModalContextProps>({
  toggleMenu: emptyFn
})
