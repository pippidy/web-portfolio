import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Section from '../../components/Section/Section';
import { getData } from '../../api/api';
import { TGame } from '../../types/types';
import SectionLoading from '../../components/Section/SectionLoading/SectionLoading';
import { catchFetchError, formatDate } from '../../utils/utils';
import CardsList from '../../components/CardsList/CardsList';
import Tabs from '../../components/Tabs/Tabs';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import DataNotAvailable from '../../components/DataNotAvailable/DataNotAvailable';
import ImageDummyDefault from '../../components/ImageDummies/ImageDummyDefault';
import InfoBullet from './InfoBullet/InfoBullet';

export default function GameInfo() {
  const { id: pageID } = useParams();
  const [pageData, setPageData] = useState<TGame[]>();
  const location = useLocation();
  const [loadingInfo, setLoadingInfo] = useState(true);

  // Resetting loading after page change
  useEffect(() => {
    setLoadingInfo(true);
  }, [location]);

  // Fetching data
  useEffect(() => {
    getData({
      endpoint: 'games',
      filter: `id = ${pageID}`,
      fields:
        'name,cover.image_id,aggregated_rating,genres.name,first_release_date,summary,storyline,similar_games,screenshots,artworks,platforms.abbreviation,involved_companies.*',
    })
      .then((data) => {
        setPageData(data);
      })
      .catch((error) => {
        catchFetchError(error);
      })
      .finally(() => setLoadingInfo(false));
  }, [pageID]);

  return (
    <>
      <Section title="Game info">
        <Tabs
          tabs={['Info', 'Screenshots', 'Artworks', 'Similar games']}
          title={pageData && pageData[0].name}
        >
          {/* INFO TAB*/}
          <>
            {loadingInfo ? (
              <SectionLoading />
            ) : (
              <>
                {pageData ? (
                  <div className="info-page__content">
                    {pageData[0].cover ? (
                      <div className="info-page__cover-holder card-flying card-flying_slide-right">
                        <img
                          className="info-page__cover-image"
                          src={`//images.igdb.com/igdb/image/upload/t_cover_big/${pageData[0].cover?.image_id}.jpg`}
                          alt={`${pageData && pageData[0].name} cover`}
                        />
                      </div>
                    ) : (
                      <div className="info-page__cover-holder info-page__cover-holder_no-image">
                        <ImageDummyDefault />
                      </div>
                    )}
                    <div className="info-page__data-holder">
                      <ul className="info-page__data-list">
                        <li>
                          <InfoBullet name="Rating">
                            {!pageData[0].aggregated_rating
                              ? 'n/a'
                              : Number(
                                  pageData[0].aggregated_rating?.toFixed(0)
                                )}
                          </InfoBullet>
                        </li>

                        <li>
                          <InfoBullet name="Release date">
                            {formatDate({
                              timestamp: pageData[0].first_release_date,
                            })}
                          </InfoBullet>
                        </li>

                        {pageData[0].platforms && (
                          <li>
                            <InfoBullet name="Platforms">
                              {pageData[0].platforms.map(
                                (platform, index, arr) => {
                                  if (index !== arr.length - 1) {
                                    return `${platform.abbreviation}, `;
                                  }
                                  return platform.abbreviation;
                                }
                              )}
                            </InfoBullet>
                          </li>
                        )}

                        {pageData[0].genres && (
                          <li>
                            <InfoBullet name="Genres">
                              {pageData[0].genres.map((genre, index, arr) => {
                                if (index !== arr.length - 1) {
                                  return `${genre.name}, `;
                                }
                                return genre.name;
                              })}
                            </InfoBullet>
                          </li>
                        )}
                      </ul>

                      <article className="info-article">
                        {pageData[0].summary && (
                          <div>
                            <h3 className="info-article__title">Summary</h3>
                            <p className="text-default">
                              {pageData[0].summary}
                            </p>
                          </div>
                        )}

                        {pageData[0].storyline && (
                          <div>
                            <h3 className="info-article__title">Storyline</h3>
                            <p className="text-default">
                              {pageData[0].storyline}
                            </p>
                          </div>
                        )}
                      </article>
                    </div>
                  </div>
                ) : (
                  <DataNotAvailable text="No info available" />
                )}
              </>
            )}
          </>

          {/* SCREENSHOTS TAB */}
          <>
            {pageData && pageData[0].screenshots ? (
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
            )}
          </>

          {/* ARTWORKS TAB*/}
          <>
            {pageData && pageData[0].artworks ? (
              <ImageGallery
                endpoint="artworks"
                imageSize="720p"
                fields="image_id"
                limit={100}
                filter={`id = ${
                  Array.isArray(pageData[0].artworks)
                    ? `(${pageData[0].artworks.join(',')})`
                    : pageData[0].artworks
                }`}
                text="Artwork"
              />
            ) : (
              <DataNotAvailable text="No artworks available" />
            )}
          </>

          {/* SIMILAR GAMES TAB */}
          <>
            {pageData && pageData[0].similar_games ? (
              <CardsList
                endpoint="games"
                fields="name,cover.url,cover.image_id,aggregated_rating"
                filter={`id = ${
                  Array.isArray(pageData[0].similar_games)
                    ? `(${pageData[0].similar_games.join(',')})`
                    : pageData[0].similar_games
                }`}
                linkPrefix="../"
                cardSize="compact"
              />
            ) : (
              <DataNotAvailable text="No smilar games available" />
            )}
          </>
        </Tabs>
      </Section>
    </>
  );
}
