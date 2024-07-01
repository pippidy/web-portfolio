import { Link } from 'react-router-dom';
import { TCompanyCardProps } from '../../types/cards';
import ImageDummyDefault from '../ImageDummies/ImageDummyDefault';

export default function CompanyCard({
  id,
  linkPrefix: linkPath,
  name,
  logo,
}: TCompanyCardProps) {
  return (
    <div className="card card-flying" title={name}>
      <Link className="card__link" to={`${linkPath}company/${id}`}>
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
