import { type TModalProps } from '../../../types/modal';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import ModalContext from '../../contexts/ModalContext';
import ButtonDefault from '../Buttons/ButtonDefault/ButtonDefault';
import useKey from '../../hooks/useKey';

export default function Modal({
  children,
  isOpened,
  setIsOpened,
  classList = '',
}: TModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  function closeModal() {
    setIsOpened(false);
  }

  // Close modal with Escape
  useKey({
    key: 'Escape',
    event: 'keyup',
    callback: closeModal,
  });

  // Close modal on page change
  useEffect(() => setIsOpened(false), [location, setIsOpened]);

  // Handle open/close
  useEffect(() => {
    if (isOpened) {
      document.body.classList.add('overflow-hidden');

      modalRef?.current?.classList.remove('animated');
      modalRef?.current?.classList.add('opened');
    } else {
      document.body.classList.remove('overflow-hidden');

      modalRef?.current?.classList.add('animated');
      modalRef?.current?.classList.remove('opened');
    }
  }, [isOpened]);

  return (
    <>
      {createPortal(
        <ModalContext.Provider
          value={{ isModalOpened: isOpened, setIsModalOpened: setIsOpened }}
        >
          <div ref={modalRef} className={`modal ${classList}`}>
            <div onClick={closeModal} className="modal__overlay"></div>

            <div className="modal__container">
              <div className="modal__close-container">
                <ButtonDefault
                  onClick={closeModal}
                  className="modal__close-button icon-cross"
                  title="Close modal"
                ></ButtonDefault>
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
