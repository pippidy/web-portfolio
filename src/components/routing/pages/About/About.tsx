import { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonDefault from '../../../UI/Buttons/ButtonDefault/ButtonDefault';
import Section from '../../../UI/Section/Section';

export default function About() {
  const [language, setLanguage] = useState<'ru' | 'eng'>('ru');

  return (
    <Section title="About">
      <div className="about">
        <div className="about__lang">
          <ButtonDefault
            onClick={() => setLanguage('ru')}
            className={language === 'ru' ? 'active' : ''}
          >
            Ru
          </ButtonDefault>

          <ButtonDefault
            onClick={() => setLanguage('eng')}
            className={language === 'eng' ? 'active' : ''}
          >
            Eng
          </ButtonDefault>
        </div>

        <div className="about__separator"></div>

        {language === 'eng' ? (
          <p>
            This project was made to demonstrate my skillset. It's work in
            progress, so I will be adding new features or further optimize
            already existing code in the future. No mobile version so
            far(min-width: 768px).
          </p>
        ) : (
          <p>
            Сайт сделан для демонстрации навыков. Фичи будут добавляться со
            временем, параллельно занимаюсь рефакторингом и оптимизацией. Пока
            что без мобильной версии(min-width: 768px).
          </p>
        )}

        <div>
          <h3 className="info-article__title">Github:</h3>

          <p>
            <a
              className="link-default"
              href="https://github.com/pippidy/web-portfolio"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/pippidy/web-portfolio
            </a>
          </p>
        </div>

        <div>
          <h3 className="info-article__title">Stack:</h3>
          <ul>
            <li>
              <p>React v18(create-react-app)</p>
            </li>

            <li>
              <p>React Router</p>
            </li>

            <li>
              <p>TypeScript</p>
            </li>

            <li>
              <p>SCSS</p>
            </li>

            <li>
              <p>Git</p>
            </li>

            <li>
              <p>IGDB API</p>
            </li>

            <li>
              <p>Adobe Illustrator</p>
            </li>
          </ul>
        </div>

        <div>
          {language === 'eng' ? (
            <>
              <h3 className="info-article__title">Most interesting bits:</h3>
              <ul>
                <li>
                  <p>Custom dynamic search bar;</p>
                </li>

                <li>
                  <p>
                    Custom pagination:{' '}
                    <Link
                      className="link-default"
                      to="/games/genres/all#page=1"
                    >
                      /games/genres/all#page=1
                    </Link>
                    ;
                  </p>
                </li>

                <li>
                  <p>
                    Custom tabs, modal windows and image gallery with a slider:{' '}
                    <Link className="link-default" to="/game/1942">
                      /game/1942
                    </Link>
                    ;
                  </p>
                </li>

                <li>
                  <p>Sign Up/Sign In system powered by Firebase 9;</p>
                </li>

                <li>
                  <p>Custom form validation;</p>
                </li>
              </ul>
            </>
          ) : (
            <>
              <h3 className="info-article__title">Самое интересное:</h3>
              <ul>
                <li>
                  <p>Кастомный динамический поиск;</p>
                </li>

                <li>
                  <p>
                    Кастомная пагинация:{' '}
                    <Link
                      className="link-default"
                      to="/games/genres/all#page=1"
                    >
                      /games/genres/all#page=1
                    </Link>
                    ;
                  </p>
                </li>

                <li>
                  <p>
                    Кастомные табы, модальные окна и галерея картинок со
                    слайдером:{' '}
                    <Link className="link-default" to="/game/1942">
                      /game/1942
                    </Link>
                    ;
                  </p>
                </li>

                <li>
                  <p>Авторизация, основанная на Firebase 9;</p>
                </li>

                <li>
                  <p>Кастомная валидация форм;</p>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
