import React from 'react'
import './modal.css'
import {ModalContext} from './ModalContext'

export interface ModalProps {
  readonly children: any
  readonly icon: any
}

export interface ModalState {
  isVisible: boolean
}

export class Modal extends React.Component<ModalProps, ModalState> {
  node: any
  constructor(props: any) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)

    this.state = {
      isVisible: false
    }
  }

  handleClick() {
    if (!this.state.isVisible) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false)
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false)
    }

    this.setState((prevState: any) => ({
      isVisible: !prevState.isVisible
    }))
  }

  handleOutsideClick(e: any) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return
    }

    this.handleClick()
  }

  render() {
    return (
      <ModalContext.Provider
        value={{
          toggleModal: this.handleClick
        }}>
        <div
          className="modal-container"
          ref={node => {
            this.node = node
          }}>
          <div role="presentation" onClick={this.handleClick}>
            {this.props.icon}
          </div>
          {this.state.isVisible && <div className="modal">{this.props.children}</div>}
        </div>
      </ModalContext.Provider>
    )
  }
}
export default Modal
