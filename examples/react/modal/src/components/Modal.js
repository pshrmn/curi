import React from 'react';

const Modal = (props) => (
  <div className='modal'>
    {props.children}
    <button
      type='button'
      onClick={(e) => {
        e.preventDefault();
        props.history.go(-1);
      }}
    >
      Close
    </button>
  </div>
);

export default Modal;
