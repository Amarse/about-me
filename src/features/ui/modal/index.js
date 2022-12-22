import './modal.moduls.scss'
import React, { useEffect, useRef } from 'react';

const Modal = (props) => {
  console.log(props);
  
  const wrapper = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', closeModal);
    return () => {
      document.removeEventListener('mousedown', closeModal);
    };
  });

  const closeModal = (event) => {
    if (wrapper && !wrapper.current.contains(event.target) !== null) {
      props.setIsModal(false);
    } else{
      props.setIsModal(true)
    }
  };
  return (
    <div className='Modal' ref={wrapper} value={props.isModal}>
      <div className='modalBody'>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
