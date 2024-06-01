import { useNavigate } from 'react-router-dom';
import Section from '../components/Section/Section';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

export default function Profile() {
  const auth = useAuth();
  const nav = useNavigate();

  // Redirect if not signed in
  useEffect(() => {
    !auth?.userSignedIn && nav('/');
  }, [auth?.userSignedIn, nav]);

  return (
    <Section title="Profile">
      <h3 className="section__title-accent">Your profile page</h3>
    </Section>
  );
}
