import { type TCompanyCardProps } from '../../../types/cards';
import { Link } from 'react-router-dom';
import ImageDummyDefault from '../ImageDummies/ImageDummyDefault';
import AnimateImage from '../AnimateImage/AnimateImage';

export default function CompanyCard({
  id,
  linkPrefix,
  name,
  logo,
}: TCompanyCardProps) {
  return (
    <div className="card card-flying animate-image-hover-trigger" title={name}>
      <Link className="card__link" to={`${linkPrefix}company/${id}`}>
        {logo ? (
          <AnimateImage>
            <img src={logo.url} alt={`Logo of ${name}`} />
          </AnimateImage>
        ) : (
          <ImageDummyDefault />
        )}

        <p className="card__name">{name}</p>
      </Link>
    </div>
  );
}
