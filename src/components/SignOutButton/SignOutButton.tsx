import { useNavigate } from 'react-router-dom';
import { TSignOutButton } from '../../types/types';
import { doSignOut } from '../../firebase/auth';

export default function SignOutButton({ children, className }: TSignOutButton) {
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
