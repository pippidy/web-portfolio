import { type TButton } from '../../../../types/ui';

export default function Button({
  onClick,
  className = '',
  children,
  ...restProps
}: TButton) {
  return (
    <button onClick={onClick} {...restProps} className={className}>
      {children}
    </button>
  );
}
