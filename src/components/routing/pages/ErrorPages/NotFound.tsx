import { Link, useLocation } from 'react-router-dom';
import ErrorBlock from '../../../UI/ErrorBlock/ErrorBlock';
import Section from '../../../UI/Section/Section';

export default function NotFound() {
  const location = useLocation();

  return (
    <>
      <Section title="Error Page" className="section_error">
        <ErrorBlock title="Error 404">
          <p className="error-block__text">
            Page <span>"{location.pathname}"</span> doesn't exist.
          </p>

          <p className="error-block__text">
            You may return to{' '}
            <Link to="/" className="link-accent">
              Homepage
            </Link>
          </p>
        </ErrorBlock>
      </Section>
    </>
  );
}
