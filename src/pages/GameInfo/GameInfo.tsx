import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Section from '../../components/Section/Section';
import { getData } from '../../components/Api/Api';
import { TGame } from '../../types/types';
import SectionLoading from '../../components/SectionLoading/SectionLoading';
import { EnumMonthsShort } from '../../components/Utils/Data';
import { extractEnumData } from '../../components/Utils/Utils';
import CardsList from '../../components/CardsList/CardsList';
import Tabs from '../../components/Tabs/Tabs';

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
        <Tabs
          tabs={['Info', 'Screenshots', 'Artworks', 'Similar games']}
          title={pageData ? pageData[0].name : ''}
        >
          {/* INFO TAB*/}
          <>
            {loadingInfo ? (
              <SectionLoading />
            ) : (
              <>
                <div className="info-page__content">
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
                            ? !pageData[0].aggregated_rating
                              ? 'n/a'
                              : Number(
                                  pageData[0].aggregated_rating?.toFixed(0)
                                )
                            : 'n/a'}
                        </div>
                      </li>

                      <li className="info-page__data-list-item">
                        <div>Release date: </div>
                        <div>
                          {pageData
                            ? pageData[0].release_dates
                              ? !pageData[0].release_dates[0].y &&
                                !pageData[0].release_dates[0].m
                                ? 'n/a'
                                : ''
                              : ''
                            : ''}
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
                </div>
              </>
            )}
          </>

          {/* SCREENSHOTS TAB*/}
          <></>

          {/* ARTWORKS TAB*/}
          <></>

          {/* SIMILAR GAMES TAB */}
          <>
            {pageData ? (
              pageData[0].similar_games ? (
                <CardsList
                  endpoint="games"
                  fields="name,cover.url,cover.image_id,aggregated_rating"
                  filter={`id = ${
                    Array.isArray(pageData[0].similar_games)
                      ? `(${pageData[0].similar_games.join(',')})`
                      : pageData[0].similar_games
                  }`}
                  infoLinkPath="../"
                  cardSize="compact"
                />
              ) : (
                <div className="data-not-available">
                  <h3>No similar games available</h3>
                </div>
              )
            ) : (
              <div className="data-not-available">
                <h3>No similar games available</h3>
              </div>
            )}
          </>
        </Tabs>
      </Section>
    </>
  );
}
