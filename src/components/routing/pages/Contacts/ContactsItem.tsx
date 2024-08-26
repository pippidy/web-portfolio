import { TContactsItem as TContactsItemProps } from '../../../../types/main';

export default function ContactsItem({ title, children }: TContactsItemProps) {
  // TODO: Move to UI
  return (
    <div className="contacts__list-item">
      <span className="contacts__list-item-title">{title}</span>{' '}
      <div className="contacts__list-item-content">{children}</div>
    </div>
  );
}
