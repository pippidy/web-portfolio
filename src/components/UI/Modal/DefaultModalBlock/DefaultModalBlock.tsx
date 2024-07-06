import { type TDefaultModalBlockProps } from '../../../../types/modal';

export default function DefaultModalBlock({
  children,
}: TDefaultModalBlockProps) {
  return (
    <div className="modal-default block-default block-default_shadowDown">
      {children}
    </div>
  );
}
