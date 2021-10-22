import React, {ReactNode, useState} from 'react'
import {SubMenuIcon} from '../SubMenuIcon'
import {ModalContext} from './ModalContext'

import './modal.css'

export interface ModalProps {
  readonly children?: ReactNode
  readonly Icon: ReactNode
  readonly type?: string
}

// eslint-disable-next-line react/display-name
export const Modal = ({children, Icon, type}: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <ModalContext.Provider
      value={{
        toggleMenu
      }}>
      <div className="modal-container">
        <div role="presentation" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {type ? <SubMenuIcon type={type} icon={Icon} /> : Icon}
        </div>
        {isMenuOpen && (
          <div
            className="modal"
            onClick={() => {
              // close modal when outside of modal is clicked
              setIsMenuOpen(false)
            }}>
            <div
              className="modal-content"
              onClick={e => {
                // do not close modal if anything inside modal content is clicked
                e.stopPropagation()
              }}>
              <div className="close-container">
                <div role="presentation" className="close" onClick={() => toggleMenu()}></div>
              </div>
              {children}
            </div>
          </div>
        )}
      </div>
    </ModalContext.Provider>
  )
}
