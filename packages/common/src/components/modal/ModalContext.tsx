import {createContext} from 'react'

interface ModalContextProps {
  toggleModal: () => void
}

const emptyFn = () => {
  /* do nothing */
}

export const ModalContext = createContext<ModalContextProps>({
  toggleModal: emptyFn
})

export default ModalContext
