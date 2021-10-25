import React, {ReactNode, useEffect, useRef, useState} from 'react'
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

  const modalRef = useRef()

  useEffect(() => {
    function handleClick(e: any) {
      if (modalRef && modalRef.current) {
        const ref: any = modalRef.current
        if (!ref.contains(e.target)) {
          toggleMenu()
        }
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <ModalContext.Provider
      value={{
        toggleMenu
      }}>
      <div className="modal-container" ref={modalRef as any}>
        <div role="presentation" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {type ? <SubMenuIcon type={type} icon={Icon} /> : Icon}
        </div>
        {isMenuOpen && (
          <div className="modal">
            <div className="modal-content">
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
