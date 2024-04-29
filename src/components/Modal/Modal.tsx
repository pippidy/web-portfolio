import { useEffect, useRef } from 'react';
import { TModal } from '../../types/types';
import { createPortal } from 'react-dom';

export default function Modal({ children, isOpened, setIsOpened }: TModal) {
  const modalRef = useRef<HTMLDivElement>(null);

  function closeModal() {
    setIsOpened(false);
  }

  useEffect(() => {
    if (modalRef.current) {
      if (isOpened) {
        modalRef.current.classList.remove('animated');
        modalRef.current.classList.add('opened');
      } else {
        modalRef.current && modalRef.current.classList.add('animated');
        modalRef.current && modalRef.current.classList.remove('opened');
      }
    }
  }, [isOpened]);

  return (
    <>
      {createPortal(
        <div ref={modalRef} className="modal">
          <div onClick={closeModal} className="modal__overlay"></div>
          <div className="modal__container">
            <button
              onClick={closeModal}
              className="icon-cross modal__button-close"
            ></button>
            {children}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
