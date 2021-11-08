import React, {ReactNode, useCallback, useEffect, useRef, useState} from 'react'
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

  const modalRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  /**
   * Add event listener, checks and close modal if
   * what the user is clicking isn't contained within it.
   */
  useEffect(() => {
    function handleClick(e: any) {
      if (!modalRef?.current?.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  /**
   * the below hooks handling dragging the modal around the window
   */
  const [position, setPosition] = useState({x: 0, y: 0})

  const modalWindowRef = useRef<HTMLDivElement>(null)

  const onMouseDown = useCallback(() => {
    const onMouseMove = (event: MouseEvent) => {
      position.x += event.movementX
      position.y += event.movementY
      const element = modalWindowRef.current
      if (element) {
        element.style.transform = `translate(${position.x}px, ${position.y}px)`
      }
      setPosition(position)
    }
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [position, setPosition, modalWindowRef])

  return (
    <ModalContext.Provider
      value={{
        toggleMenu
      }}>
      <div className="modal-container" ref={modalRef}>
        <div role="presentation" onClick={toggleMenu}>
          {type ? <SubMenuIcon type={type} icon={Icon} /> : Icon}
        </div>
        {isMenuOpen && (
          <div className="modal" ref={modalWindowRef} onMouseDown={onMouseDown}>
            <div>
              <div className="close-btn-container">
                <div role="presentation" className="close" onClick={toggleMenu}></div>
              </div>
            </div>
            <div style={{flex: '1 1 auto'}}>{children}</div>
          </div>
        )}
      </div>
    </ModalContext.Provider>
  )
}
