import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Section from '../../components/Section/Section';
import { getData } from '../../components/Api/Api';
import { TGame } from '../../types/types';
import SectionLoading from '../../components/SectionLoading/SectionLoading';
import { EnumMonthsShort } from '../../components/Utils/Data';
import { extractEnumData } from '../../components/Utils/Utils';
import CardsList from '../../components/CardsList/CardsList';

export default function GameInfo() {
  const { id: pageID } = useParams();
  const [pageData, setPageData] = useState<TGame[]>();
  const location = useLocation();

  // Loadings
  const [loadingInfo, setLoadingInfo] = useState(true);

  useEffect(() => {
    setLoadingInfo(true);
  }, [location]);

  useEffect(() => {
    getData({
      endpoint: 'games',
      filter: `id = ${pageID}`,
      limit: 100,
      fields:
        'name,cover.image_id,aggregated_rating,release_dates.m,release_dates.y,summary,storyline,similar_games',
    })
      .then((data) => {
        setPageData(data);
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => setLoadingInfo(false));
  }, [pageID]);

  return (
    <>
      <Section title="Game info">
        <div className="info-page">
          {loadingInfo ? (
            <SectionLoading />
          ) : (
            <>
              <h2 className="info-page__title">
                {pageData ? pageData[0].name : ''}
              </h2>

              <section className="info-page__content">
                <div className="info-page__cover-holder card-flying card-flying_slide-right">
                  <img
                    className="info-page__cover-image"
                    src={`//images.igdb.com/igdb/image/upload/t_cover_big/${
                      pageData ? pageData[0].cover?.image_id : ''
                    }.jpg`}
                    alt=""
                  />
                </div>

                <div className="info-page__data-holder">
                  <ul className="info-page__data-list">
                    <li className="info-page__data-list-item">
                      <div>Rating:</div>{' '}
                      <div>
                        {pageData
                          ? Number(pageData[0].aggregated_rating?.toFixed(1))
                          : '?'}
                      </div>
                    </li>
                    <li className="info-page__data-list-item">
                      <div>Release date: </div>
                      <div>
                        {pageData
                          ? pageData[0].release_dates
                            ? extractEnumData({
                                id: pageData[0].release_dates[0].m,
                                enumObject: EnumMonthsShort,
                              })
                            : '?'
                          : '?'}{' '}
                        {pageData
                          ? pageData[0].release_dates
                            ? pageData[0].release_dates[0].y
                            : '?'
                          : '?'}
                      </div>
                    </li>
                  </ul>

                  <article className="info-article">
                    <div>
                      {pageData ? (
                        pageData[0].summary ? (
                          <>
                            <h3 className="info-article__title">Summary</h3>
                            <p className="info-article__text">
                              {pageData[0].summary}
                            </p>
                          </>
                        ) : (
                          ''
                        )
                      ) : (
                        ''
                      )}
                    </div>

                    <div>
                      {pageData ? (
                        pageData[0].storyline ? (
                          <>
                            <h3 className="info-article__title">Storyline</h3>
                            <p className="info-article__text">
                              {pageData[0].storyline}
                            </p>
                          </>
                        ) : (
                          ''
                        )
                      ) : (
                        ''
                      )}
                    </div>
                  </article>
                </div>
              </section>
            </>
          )}
        </div>
      </Section>
      <Section title="More content">
        <div className="tabs">
          <header>
            <ul className="tabs__menu">
              <li className="tabs__menu-item">
                <button className="tabs__menu-button active">
                  Similar games
                </button>
              </li>

              <li className="tabs__menu-item">
                <button className="tabs__menu-button">Screenshots</button>
              </li>

              <li className="tabs__menu-item">
                <button className="tabs__menu-button">Artworks</button>
              </li>
            </ul>
          </header>

          <div className="tabs__content" style={{ display: 'block' }}>
            <CardsList
              endpoint="games"
              fields="name,cover.url,cover.image_id,aggregated_rating"
              filter={
                pageData
                  ? `id = ${
                      Array.isArray(pageData[0].similar_games)
                        ? `(${pageData[0].similar_games.join(',')})`
                        : pageData[0].similar_games
                    }`
                  : ''
              }
              infoLinkPath="../"
              compact
            />
          </div>
        </div>
      </Section>
    </>
  );
}
