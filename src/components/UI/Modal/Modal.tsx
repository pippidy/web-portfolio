import { type TModalProps } from '../../../types/modal';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import ModalContext from '../../../contexts/ModalContext';
import Button from '../Buttons/Button/Button';

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

  useEffect(() => setIsOpened(false), [location, setIsOpened]);

  useEffect(() => {
    if (isOpened) {
      modalRef?.current?.classList.remove('animated');
      modalRef?.current?.classList.add('opened');
    } else {
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
                <Button
                  onClick={closeModal}
                  className="modal__close-button icon-cross"
                  title="Close modal"
                ></Button>
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
