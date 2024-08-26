import Section from '../../../UI/Section/Section';

export default function AuthError() {
  return (
    <>
      <Section title="Error Page" className="section_error">
        <div className="error-page">
          <div className="error-page__container">
            <h3 className="error-page__title">You're not authorized!</h3>
            <p className="error-page__text">
              You have to be signed in to your account to view this page!
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
