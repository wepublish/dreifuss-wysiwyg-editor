import React, {ReactNode, useEffect, useRef, useState} from 'react'
import {SubMenuIcon} from '../SubMenuIcon'
import {ModalContext} from './ModalContext'

import './modal.css'

export interface ModalProps {
  readonly children: ReactNode
  readonly Icon: ReactNode
  readonly type?: string
}

export const Modal = ({children, Icon, type}: ModalProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(false)
  }

  const modalRef = useRef<HTMLDivElement>(null)

  /**
   * Add event listener, checks and close modal if what the user is clicking isn't contained within it.
   */
  useEffect(() => {
    function handleClick(e: any) {
      if (!modalRef?.current?.contains(e.target)) {
        toggleMenu()
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
      <div className="modal-container" ref={modalRef}>
        <div role="presentation" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {type ? <SubMenuIcon type={type} icon={Icon} /> : Icon}
        </div>
        {isMenuOpen && (
          <div className="modal">
            <div>
              <div className="close-btn-container">
                <div role="presentation" className="close" onClick={() => toggleMenu()}></div>
              </div>
            </div>
            <div style={{flex: '1 1 auto'}}>{children}</div>
          </div>
        )}
      </div>
    </ModalContext.Provider>
  )
}
