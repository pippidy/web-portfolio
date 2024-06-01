import { Link, useLocation } from 'react-router-dom';
import Section from '../../components/Section/Section';

export default function NotFound() {
  const location = useLocation();

  return (
    <>
      <Section title="Error Page" className="section_error">
        <div className="error-page">
          <div className="error-page__container">
            <h3 className="error-page__title">Error 404</h3>
            <p className="error-page__text">
              Page <span>"{location.pathname}"</span> doesn't exist.
            </p>
            <p className="error-page__text">
              You may return to{' '}
              <Link to="/" className="link-default">
                Homepage
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
