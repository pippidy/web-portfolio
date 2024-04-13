import { Link } from 'react-router-dom';
import { TCompany } from '../../types/types';
import ImageDummyDefault from '../ImageDummies/ImageDummyDefault';

export default function CompaniesCard({ name, logo }: TCompany) {
  return (
    <div className="card">
      <Link className="card__link" to="/">
        {logo ? (
          <img className="card__image" src={logo.url} alt={`Logo of ${name}`} />
        ) : (
          <ImageDummyDefault />
        )}
      </Link>

      <p className="card__name">{name}</p>
    </div>
  );
}
