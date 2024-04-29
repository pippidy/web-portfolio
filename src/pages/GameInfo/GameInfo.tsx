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
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import DataNotAvailable from '../../components/DataNotAvailable/DataNotAvailable';

export default function GameInfo() {
  const { id: pageID } = useParams();
  const [pageData, setPageData] = useState<TGame[]>();
  const [genres, setGenres] = useState<string[]>([]);
  const location = useLocation();

  // Loadings
  const [loadingInfo, setLoadingInfo] = useState(true);

  useEffect(() => {
    setGenres([]);
    setLoadingInfo(true);
  }, [location]);

  useEffect(() => {
    getData({
      endpoint: 'games',
      filter: `id = ${pageID}`,
      limit: 100,
      fields:
        'name,cover.image_id,aggregated_rating,genres.name,release_dates.m,release_dates.y,summary,storyline,similar_games,screenshots',
    })
      .then((data) => {
        setPageData(data);

        // Setting genres array
        if (data && data[0].genres) {
          data[0].genres.forEach((item) => {
            setGenres((prevState) => {
              if (item.name) prevState?.push(item.name);
              return prevState;
            });
          });
        }
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
                    {pageData ? (
                      <ul className="info-page__data-list">
                        <li className="info-page__data-list-item">
                          <div>Rating:</div>{' '}
                          <div>
                            {!pageData[0].aggregated_rating
                              ? 'n/a'
                              : Number(
                                  pageData[0].aggregated_rating?.toFixed(0)
                                )}
                          </div>
                        </li>

                        <li className="info-page__data-list-item">
                          <div>Release date: </div>
                          <div>
                            {pageData[0].release_dates
                              ? !pageData[0].release_dates[0].y &&
                                !pageData[0].release_dates[0].m
                              : 'n/a'}
                            {pageData[0].release_dates
                              ? extractEnumData({
                                  id: pageData[0].release_dates[0].m,
                                  enumObject: EnumMonthsShort,
                                })
                              : ''}{' '}
                            {pageData[0].release_dates
                              ? pageData[0].release_dates[0].y
                              : ''}
                          </div>
                        </li>

                        {pageData[0].genres ? (
                          <li className="info-page__data-list-item">
                            <div>Genres: </div>
                            <div>{genres.join(', ')}</div>
                          </li>
                        ) : (
                          ''
                        )}
                      </ul>
                    ) : (
                      ''
                    )}

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

          {/* SCREENSHOTS TAB */}
          <>
            {pageData ? (
              pageData[0].screenshots ? (
                <ImageGallery
                  endpoint="screenshots"
                  imageSize="screenshot_huge"
                  fields="image_id"
                  limit={100}
                  filter={`id = ${
                    Array.isArray(pageData[0].screenshots)
                      ? `(${pageData[0].screenshots.join(',')})`
                      : pageData[0].screenshots
                  }`}
                  text="Screenshot"
                />
              ) : (
                <DataNotAvailable text="No screenshots available" />
              )
            ) : (
              ''
            )}
          </>

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
                <DataNotAvailable text="No smilar games available" />
              )
            ) : (
              <DataNotAvailable text="No smilar games available" />
            )}
          </>
        </Tabs>
      </Section>
    </>
  );
}
