import { type TCompanyCardProps } from '../../../types/cards';
import { Link } from 'react-router-dom';
import ImageDummyDefault from '../../ImageDummies/ImageDummyDefault';

export default function CompanyCard({
  id,
  linkPrefix,
  name,
  logo,
}: TCompanyCardProps) {
  return (
    <div className="card card-flying" title={name}>
      <Link className="card__link" to={`${linkPrefix}company/${id}`}>
        {logo ? (
          <img className="card__image" src={logo.url} alt={`Logo of ${name}`} />
        ) : (
          <ImageDummyDefault />
        )}

        <p className="card__name">{name}</p>
      </Link>
    </div>
  );
}
