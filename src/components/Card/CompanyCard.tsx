import { Link } from 'react-router-dom';
import { TCompanyCard } from '../../types/types';
import ImageDummyDefault from '../ImageDummies/ImageDummyDefault';
import { cutLongString } from '../Utils/Utils';

export default function CompanyCard({
  id,
  linkPath,
  name,
  logo,
}: TCompanyCard) {
  const nameLength = 15;

  return (
    <div className="card card-flying" title={name}>
      <Link className="card__link" to={`${linkPath}company/${id}`}>
        {logo ? (
          <img className="card__image" src={logo.url} alt={`Logo of ${name}`} />
        ) : (
          <ImageDummyDefault />
        )}

        <p className="card__name">
          {name
            ? cutLongString({ string: name, length: nameLength, end: '...' })
            : ''}
        </p>
      </Link>
    </div>
  );
}
