import { useParams } from 'react-router-dom';
import Section from '../../components/Section/Section';
import SectionLoading from '../../components/Section/SectionLoading/SectionLoading';
import CardsList from '../../components/CardsList/CardsList';
import Tabs from '../../components/UI/Tabs/Tabs';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import DataNotAvailable from '../../components/UI/DataNotAvailable/DataNotAvailable';
import ImageDummyDefault from '../../components/ImageDummies/ImageDummyDefault';
import InfoItem from './InfoItem/InfoItem';
import useGetData from '../../hooks/useGetData';
import { formatDate } from '../../utils/utils';
import DataError from '../../components/UI/DataError/DataError';

export default function GameInfo() {
  const { id: pageID } = useParams();
  const { data, loading, error } = useGetData({
    endpoint: 'games',
    filter: `id = ${pageID}`,
    fields:
      'name,cover.image_id,aggregated_rating,genres.name,first_release_date,summary,storyline,similar_games,screenshots,artworks,platforms.abbreviation,involved_companies.*',
    pageID,
  });

  return (
    <>
      <Section title="Game info">
        {error ? (
          <DataError error={error} />
        ) : (
          <Tabs
            tabs={['Info', 'Screenshots', 'Artworks', 'Similar games']}
            title={data && data[0].name}
          >
            {/* INFO TAB*/}
            <>
              {loading ? (
                <SectionLoading />
              ) : (
                <>
                  {data ? (
                    <div className="info-page__content">
                      {data[0].cover ? (
                        <div className="info-page__cover-holder card-flying card-flying_slide-right">
                          <img
                            className="info-page__cover-image"
                            src={`//images.igdb.com/igdb/image/upload/t_cover_big/${data[0].cover?.image_id}.jpg`}
                            alt={`${data && data[0].name} cover`}
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
                            <InfoItem name="Rating">
                              {!data[0].aggregated_rating
                                ? 'n/a'
                                : Number(data[0].aggregated_rating?.toFixed(0))}
                            </InfoItem>
                          </li>

                          <li>
                            <InfoItem name="Release date">
                              {formatDate({
                                timestamp: data[0].first_release_date,
                              })}
                            </InfoItem>
                          </li>

                          {data[0].platforms && (
                            <li>
                              <InfoItem name="Platforms">
                                {data[0].platforms.map(
                                  (platform, index, arr) => {
                                    if (index !== arr.length - 1) {
                                      return `${platform.abbreviation}, `;
                                    }
                                    return platform.abbreviation;
                                  }
                                )}
                              </InfoItem>
                            </li>
                          )}

                          {data[0].genres && (
                            <li>
                              <InfoItem name="Genres">
                                {data[0].genres.map((genre, index, arr) => {
                                  if (index !== arr.length - 1) {
                                    return `${genre.name}, `;
                                  }
                                  return genre.name;
                                })}
                              </InfoItem>
                            </li>
                          )}
                        </ul>

                        <article className="info-article">
                          {data[0].summary && (
                            <div>
                              <h3 className="info-article__title">Summary</h3>
                              <p className="text-default">{data[0].summary}</p>
                            </div>
                          )}

                          {data[0].storyline && (
                            <div>
                              <h3 className="info-article__title">Storyline</h3>
                              <p className="text-default">
                                {data[0].storyline}
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
              {data && data[0].screenshots ? (
                <ImageGallery
                  apiOptions={{
                    endpoint: 'screenshots',
                    fields: 'image_id',
                    limit: 100,
                    filter: `id = ${
                      Array.isArray(data[0].screenshots)
                        ? `(${data[0].screenshots.join(',')})`
                        : data[0].screenshots
                    }`,
                  }}
                  imageSize="screenshot_huge"
                  text="Screenshot"
                />
              ) : (
                <DataNotAvailable text="No screenshots available" />
              )}
            </>

            {/* ARTWORKS TAB*/}
            <>
              {data && data[0].artworks ? (
                <ImageGallery
                  apiOptions={{
                    endpoint: 'artworks',
                    fields: 'image_id',
                    limit: 100,
                    filter: `id = ${
                      Array.isArray(data[0].artworks)
                        ? `(${data[0].artworks.join(',')})`
                        : data[0].artworks
                    }`,
                  }}
                  imageSize="720p"
                  text="Artwork"
                />
              ) : (
                <DataNotAvailable text="No artworks available" />
              )}
            </>

            {/* SIMILAR GAMES TAB */}
            <>
              {data && data[0].similar_games ? (
                <CardsList
                  apiOptions={{
                    endpoint: 'games',
                    fields: 'name,cover.url,cover.image_id,aggregated_rating',
                    filter: `id = ${
                      Array.isArray(data[0].similar_games)
                        ? `(${data[0].similar_games.join(',')})`
                        : data[0].similar_games
                    }`,
                  }}
                  linkPrefix="../"
                  cardSize="compact"
                />
              ) : (
                <DataNotAvailable text="No smilar games available" />
              )}
            </>
          </Tabs>
        )}
      </Section>
    </>
  );
}
