import React from 'react';
// icons
import { FiX } from 'react-icons/fi';
// styles
import './Modal.css';

export function Modal(props) {
  const { open, closeModal, modalTitle, children, size } = props;

  const generateSize = size => {
    switch (size) {
      case 'sm':
        return {
          width: 320,
          height: 270
        }
      case 'md':
        return {
          width: 400,
          height: 350
        }
      case 'lg':
        return {
          width: 700,
          height: 500
        }
      default:
        return {
          width: 'auto',
          height: 'auto'
        }
    }
  }

  return (
    <div
      className="external"
      style={{
        visibility: open ? "visible" : "hidden",
        opacity: open ? 1 : 0
      }}
    >
      <div
        className="modal"
        style={{
          ...generateSize(size)
        }}
      >
        <div className="modal__header">
          <span>{modalTitle}</span>
          <FiX
            className="close"
            size={19}
            color="#999999"
            title="Fechar modal"
            onClick={closeModal}
          />
        </div>

        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );
}
