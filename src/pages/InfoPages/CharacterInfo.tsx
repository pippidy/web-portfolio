import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { TDataCharacter } from '../../types/data';
import { getData } from '../../api/api';
import Section from '../../components/Section/Section';
import SectionLoading from '../../components/Section/SectionLoading/SectionLoading';
import CardsList from '../../components/CardsList/CardsList';
import Tabs from '../../components/UI/Tabs/Tabs';
import DataNotAvailable from '../../components/DataNotAvailable/DataNotAvailable';
import ImageDummyAvatar from '../../components/ImageDummies/ImageDummyAvatar';
import InfoBullet from './InfoBullet/InfoBullet';
import { Gender, Species } from '../../utils/data';
import { catchFetchError, extractEnumData } from '../../utils/utils';

export default function CharacterInfo() {
  const { id: pageID } = useParams();
  const [pageData, setPageData] = useState<TDataCharacter[]>();
  const [loadingInfo, setLoadingInfo] = useState(true);
  const location = useLocation();

  // Resetting loading after page change
  useEffect(() => {
    setLoadingInfo(true);
  }, [location]);

  // Fetching data
  useEffect(() => {
    getData({
      endpoint: 'characters',
      filter: `id = ${pageID}`,
      fields: 'name,mug_shot.image_id,games,description,gender,species',
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
      <Section title="Character info">
        <Tabs tabs={['Info', 'Games']} title={pageData && pageData[0].name}>
          {/* INFO TAB*/}
          <>
            {loadingInfo ? (
              <SectionLoading />
            ) : (
              <>
                {pageData ? (
                  <div className="info-page__content">
                    {pageData[0].mug_shot ? (
                      <div className="info-page__cover-holder card-flying card-flying_slide-right">
                        <img
                          className="info-page__cover-image"
                          src={`//images.igdb.com/igdb/image/upload/t_thumb_2x/${
                            pageData[0].mug_shot &&
                            pageData[0].mug_shot.image_id
                          }.jpg`}
                          alt={`Mugshot of ${pageData[0].name}`}
                        />
                      </div>
                    ) : (
                      <div className="info-page__cover-holder info-page__cover-holder_no-image">
                        <ImageDummyAvatar />
                      </div>
                    )}

                    <div className="info-page__data-holder">
                      <ul className="info-page__data-list">
                        {pageData[0].country_name && (
                          <li>
                            <InfoBullet name="Country">
                              {pageData[0].country_name}
                            </InfoBullet>
                          </li>
                        )}

                        {pageData[0].gender !== undefined && (
                          <li>
                            <InfoBullet name="Gender">
                              {extractEnumData({
                                id: pageData[0].gender + 1,
                                enumObject: Gender,
                              })}
                            </InfoBullet>
                          </li>
                        )}

                        {pageData[0].species && (
                          <li>
                            <InfoBullet name="Species">
                              {extractEnumData({
                                id: pageData[0].species,
                                enumObject: Species,
                              })}
                            </InfoBullet>
                          </li>
                        )}
                      </ul>

                      <article className="info-article">
                        {pageData[0].description && (
                          <div>
                            <h3 className="info-article__title">Description</h3>
                            <p className="text-default">
                              {pageData[0].description}
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
            {pageData && pageData[0].games ? (
              <CardsList
                apiOptions={{
                  endpoint: 'games',
                  fields: 'name,cover.url,cover.image_id,aggregated_rating',
                  filter: `id = ${
                    Array.isArray(pageData[0].games)
                      ? `(${pageData[0].games.join(',')})`
                      : pageData[0].games
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
      </Section>
    </>
  );
}
