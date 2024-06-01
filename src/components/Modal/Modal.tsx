import { useEffect, useRef } from 'react';
import { TModal } from '../../types/types';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import ModalContext from '../../contexts/ModalContext';

export default function Modal({
  children,
  isOpened,
  setIsOpened,
  classList = '',
}: TModal) {
  const modalRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  function closeModal() {
    setIsOpened(false);
  }

  useEffect(() => setIsOpened(false), [location, setIsOpened]);

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
        <ModalContext.Provider value={isOpened}>
          <div ref={modalRef} className={`modal ${classList}`}>
            <div onClick={closeModal} className="modal__overlay"></div>

            <div className="modal__container">
              <div className="modal__close-container">
                <button
                  onClick={closeModal}
                  className="modal__close-button icon-cross"
                  title="Close modal"
                ></button>
              </div>
              {children}
            </div>
          </div>
        </ModalContext.Provider>,
        document.body
      )}
    </>
  );
}
