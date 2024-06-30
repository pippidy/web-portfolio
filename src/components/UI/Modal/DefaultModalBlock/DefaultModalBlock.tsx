import { TDefaultModalBlock } from '../../../../types/modal';

export default function DefaultModalBlock({ children }: TDefaultModalBlock) {
  return (
    <div className="modal-default block-default block-default_shadowDown">
      {children}
    </div>
  );
}
