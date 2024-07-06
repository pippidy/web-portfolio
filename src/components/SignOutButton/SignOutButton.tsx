import { type TSignOutButtonProps } from '../../types/auth';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../../firebase/auth';
import Button from '../UI/Buttons/Button/Button';

export default function SignOutButton({
  children,
  className,
}: TSignOutButtonProps) {
  const nav = useNavigate();

  function onClick() {
    doSignOut().finally(() => nav('/'));
  }

  return (
    <Button onClick={onClick} className={className}>
      {children}
    </Button>
  );
}
