import { useParams } from 'react-router-dom';
import Section from '../../components/Section/Section';
import SectionLoading from '../../components/Section/SectionLoading/SectionLoading';
import { formatDate, getCountryFromISO } from '../../utils/utils';
import CardsList from '../../components/CardsList/CardsList';
import Tabs from '../../components/UI/Tabs/Tabs';
import DataNotAvailable from '../../components/DataNotAvailable/DataNotAvailable';
import ImageDummyDefault from '../../components/ImageDummies/ImageDummyDefault';
import InfoBullet from './InfoBullet/InfoBullet';
import useGetData from '../../hooks/useGetData';

export default function CompanyInfo() {
  const { id: pageID } = useParams();
  const { data, loading } = useGetData({
    endpoint: 'companies',
    filter: `id = ${pageID}`,
    fields:
      'name,logo.image_id,published,developed,start_date,description,websites.url,country',
    pageID,
  });

  return (
    <>
      <Section title="Company info">
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
                          <InfoBullet name="Foundation date">
                            {formatDate({ timestamp: data[0].start_date })}
                          </InfoBullet>
                        </li>

                        {data[0].country && (
                          <li>
                            <InfoBullet name="Country">
                              {getCountryFromISO({
                                isoCode: data[0].country,
                              })}
                            </InfoBullet>
                          </li>
                        )}

                        {data[0].websites && (
                          <li>
                            <InfoBullet name="Website">
                              <a
                                href={data[0].websites[0].url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {data[0].websites[0].url}
                              </a>
                            </InfoBullet>
                          </li>
                        )}
                      </ul>

                      <article className="info-article">
                        {data[0].description && (
                          <div>
                            <h3 className="info-article__title">Description</h3>
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
      </Section>
    </>
  );
}
