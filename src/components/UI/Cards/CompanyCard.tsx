import { type TCompanyCardProps } from '../../../types/cards';
import { Link } from 'react-router-dom';
import ImageDummyDefault from '../ImageDummies/ImageDummyDefault';

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
          <div className="card__image-holder">
            <img
              className="card__image card__image_animate"
              src={logo.url}
              alt=""
            />
            <img
              className="card__image card__image_grayscale"
              src={logo.url}
              alt={`Logo of ${name}`}
            />
          </div>
        ) : (
          <ImageDummyDefault />
        )}

        <p className="card__name">{name}</p>
      </Link>
    </div>
  );
}
