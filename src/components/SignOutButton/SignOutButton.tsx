import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../../firebase/auth';
import { TSignOutButton } from '../../types/auth';

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
