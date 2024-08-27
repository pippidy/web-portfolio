import { type TComponentChildren } from '../../../types/main';

export default function ErrorBlock({
  title,
  children,
}: {
  title: string;
  children: TComponentChildren<React.ReactNode>;
}) {
  return (
    <div className="error-block">
      <div className="error-block__container">
        <h3 className="error-block__title">{title}</h3>
        {children}
      </div>
    </div>
  );
}
