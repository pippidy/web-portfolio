import { useParams } from 'react-router-dom';
import DataNotAvailable from '../../../UI/DataNotAvailable/DataNotAvailable';
import InfoItem from './InfoItem/InfoItem';
import DataError from '../../../UI/DataError/DataError';
import useGetData from '../../../hooks/useGetData';
import Section from '../../../UI/Section/Section';
import Tabs from '../../../UI/Tabs/Tabs';
import SectionLoading from '../../../UI/Section/SectionLoading/SectionLoading';
import ImageDummyAvatar from '../../../UI/ImageDummies/ImageDummyAvatar';
import CardsList from '../../../UI/CardsList/CardsList';
import { Gender, Species } from '../../../../utils/data';

export default function CharacterInfo() {
  const { id: pageID } = useParams();
  const { data, loading, error } = useGetData({
    endpoint: 'characters',
    filter: `id = ${pageID}`,
    fields: 'name,mug_shot.image_id,games,description,gender,species',
    pageID,
  });

  return (
    <>
      <Section title="Character info">
        {error ? (
          <DataError error={error} />
        ) : (
          <Tabs tabs={['Info', 'Games']} title={data && data[0].name}>
            {/* INFO TAB*/}
            <>
              {loading ? (
                <SectionLoading />
              ) : (
                <>
                  {data ? (
                    <div className="info-page__content">
                      {data[0].mug_shot ? (
                        <div className="info-page__cover-holder card-flying card-flying_slide-right">
                          <img
                            className="info-page__cover-image"
                            src={`//images.igdb.com/igdb/image/upload/t_thumb_2x/${
                              data[0].mug_shot && data[0].mug_shot.image_id
                            }.jpg`}
                            alt={`Mugshot of ${data[0].name}`}
                          />
                        </div>
                      ) : (
                        <div className="info-page__cover-holder info-page__cover-holder_no-image">
                          <ImageDummyAvatar />
                        </div>
                      )}

                      <div className="info-page__data-holder">
                        <ul className="info-page__data-list">
                          {data[0].country_name && (
                            <li>
                              <InfoItem name="Country">
                                {data[0].country_name}
                              </InfoItem>
                            </li>
                          )}

                          {/* Sometimes API returns undefined */}
                          {data[0].gender !== undefined && (
                            <li>
                              <InfoItem name="Gender">
                                {Gender[data[0].gender + 1]}
                              </InfoItem>
                            </li>
                          )}

                          {data[0].species && (
                            <li>
                              <InfoItem name="Species">
                                {Species[data[0].species]}
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

            {/* GAMES TAB */}
            <>
              {data && data[0].games ? (
                <CardsList
                  apiOptions={{
                    endpoint: 'games',
                    fields: 'name,cover.url,cover.image_id,aggregated_rating',
                    filter: `id = ${
                      Array.isArray(data[0].games)
                        ? `(${data[0].games.join(',')})`
                        : data[0].games
                    }`,
                  }}
                  linkPrefix="../"
                  cardSize="compact"
                />
              ) : (
                <DataNotAvailable text="No games available" />
              )}
            </>
          </Tabs>
        )}
      </Section>
    </>
  );
}
