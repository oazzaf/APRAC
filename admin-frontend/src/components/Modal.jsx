// src/components/Modal.jsx

import React from 'react';
import { FiX } from 'react-icons/fi';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FiX size={24} />
        </button>

        {/* Modal Header */}
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}

        {/* Modal Body */}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;