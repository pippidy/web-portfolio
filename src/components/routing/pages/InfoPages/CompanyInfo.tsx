import { useParams } from 'react-router-dom';
import { formatDate, getCountryFromISO } from '../../../../utils/utils';
import DataNotAvailable from '../../../UI/DataNotAvailable/DataNotAvailable';
import InfoItem from './InfoItem/InfoItem';
import DataError from '../../../UI/DataError/DataError';
import useGetData from '../../../hooks/useGetData';
import Section from '../../../UI/Section/Section';
import Tabs from '../../../UI/Tabs/Tabs';
import SectionLoading from '../../../UI/Section/SectionLoading/SectionLoading';
import ImageDummyDefault from '../../../UI/ImageDummies/ImageDummyDefault';
import CardsList from '../../../UI/CardsList/CardsList';

export default function CompanyInfo() {
  const { id: pageID } = useParams();
  const { data, loading, error } = useGetData({
    endpoint: 'companies',
    filter: `id = ${pageID}`,
    fields:
      'name,logo.image_id,published,developed,start_date,description,websites.url,country',
    pageID,
  });

  return (
    <>
      <Section title="Company info">
        {error ? (
          <DataError error={error} />
        ) : (
          <Tabs
            tabs={['Info', 'Developed games', 'Published games']}
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
                      {data[0].logo ? (
                        <div className="info-page__cover-holder card-flying card-flying_slide-right">
                          <img
                            className="info-page__cover-image"
                            src={`//images.igdb.com/igdb/image/upload/t_thumb_2x/${data[0].logo.image_id}.jpg`}
                            alt={`${data[0].name && data[0].name} logo`}
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
                            <InfoItem name="Foundation date">
                              {formatDate({ timestamp: data[0].start_date })}
                            </InfoItem>
                          </li>

                          {data[0].country && (
                            <li>
                              <InfoItem name="Country">
                                {getCountryFromISO({
                                  isoCode: data[0].country,
                                })}
                              </InfoItem>
                            </li>
                          )}

                          {data[0].websites && (
                            <li>
                              <InfoItem name="Website">
                                <a
                                  href={data[0].websites[0].url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {data[0].websites[0].url}
                                </a>
                              </InfoItem>
                            </li>
                          )}
                        </ul>

                        <article className="info-article">
                          {data[0].description && (
                            <div>
                              <h3 className="info-article__title">
                                Description
                              </h3>
                              <p className="text-default">
                                {data[0].description}
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

            {/* DEVELOPED GAMES TAB */}
            <>
              {data && data[0].developed ? (
                <CardsList
                  apiOptions={{
                    endpoint: 'games',
                    fields: 'name,cover.url,cover.image_id,aggregated_rating',
                    filter: `id = ${
                      Array.isArray(data[0].developed)
                        ? `(${data[0].developed.join(',')})`
                        : data[0].developed
                    }`,
                  }}
                  linkPrefix="../"
                  cardSize="compact"
                />
              ) : (
                <DataNotAvailable text="No developed games available" />
              )}
            </>

            {/* PUBLISHED GAMES TAB */}
            <>
              {data && data[0].published ? (
                <CardsList
                  apiOptions={{
                    endpoint: 'games',
                    fields: 'name,cover.url,cover.image_id,aggregated_rating',
                    filter: `id = ${
                      Array.isArray(data[0].published)
                        ? `(${data[0].published.join(',')})`
                        : data[0].published
                    }`,
                  }}
                  linkPrefix="../"
                  cardSize="compact"
                />
              ) : (
                <DataNotAvailable text="No published games available" />
              )}
            </>
          </Tabs>
        )}
      </Section>
    </>
  );
}
