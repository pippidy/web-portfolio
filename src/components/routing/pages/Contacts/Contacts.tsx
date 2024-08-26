import Section from '../../../UI/Section/Section';
import ContactsItem from './ContactsItem';

export default function Contacts() {
  return (
    <Section title="Contacts">
      <div className="contacts">
        <ul className="contacts__list">
          <li>
            <ContactsItem title="Phone">
              <a className="contacts__list-item-link" href="tel: +79297115061">
                +7 (929) 711-50-61
              </a>
            </ContactsItem>
          </li>

          <li>
            <ContactsItem title="Email">
              <a href="mailto: pippidy@gmail.com">pippidy@gmail.com</a>
            </ContactsItem>
          </li>

          <li>
            <ContactsItem title="Github">
              <a
                href="https://github.com/pippidy"
                target="_blank"
                rel="noreferrer"
              >
                https://github.com/pippidy
              </a>
            </ContactsItem>
          </li>

          <li>
            <ContactsItem title="Headhunter">
              <a
                href="https://samara.hh.ru/applicant/resumes/view?resume=3a2876e1ff018051c10039ed1f6b3537756258"
                target="_blank"
                rel="noreferrer"
              >
                link to my resume
              </a>
            </ContactsItem>
          </li>
        </ul>
      </div>
    </Section>
  );
}
