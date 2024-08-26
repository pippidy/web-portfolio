import { type TButton } from '../../../../types/ui';

export default function ButtonDefault({
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
