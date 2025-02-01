import { type TButtonSignOutProps } from '../../../../types/props';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../../../../firebase/auth';

export default function ButtonSignOut({
  children,
  className,
}: TButtonSignOutProps) {
  const nav = useNavigate();

  function onClick() {
    doSignOut().finally(() => nav('/'));
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
