import { useContext } from 'react';
import ModalContext from '../contexts/ModalContext';

export default function useModal() {
  const modal = useContext(ModalContext);

  if (!modal) throw new Error('useModal must be used inside ModalContext');

  return modal;
}
