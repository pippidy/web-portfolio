import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Section from '../../components/Section/Section';
import { getData } from '../../components/Api/Api';
import { TCharacter } from '../../types/types';
import SectionLoading from '../../components/SectionLoading/SectionLoading';
import CardsList from '../../components/CardsList/CardsList';
import Tabs from '../../components/Tabs/Tabs';
import DataNotAvailable from '../../components/DataNotAvailable/DataNotAvailable';
import { extractEnumData } from '../../components/Utils/Utils';
import { Gender, Species } from '../../components/Utils/Data';

export default function CharacterInfo() {
  const { id: pageID } = useParams();
  const [pageData, setPageData] = useState<TCharacter[]>();
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
      .catch((err) => console.log(`Error: ${err}`))
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
                    <div className="info-page__cover-holder card-flying card-flying_slide-right">
                      <img
                        className="info-page__cover-image"
                        src={`//images.igdb.com/igdb/image/upload/t_thumb_2x/${
                          pageData[0].mug_shot && pageData[0].mug_shot.image_id
                        }.jpg`}
                        alt=""
                      />
                    </div>
                    <div className="info-page__data-holder">
                      <ul className="info-page__data-list">
                        {pageData[0].country_name && (
                          <li className="info-page__data-list-item">
                            <div>Country: </div>
                            <div>{pageData[0].country_name}</div>
                          </li>
                        )}

                        {pageData[0].gender !== undefined ? (
                          <li className="info-page__data-list-item">
                            <div>Gender: </div>
                            <div>
                              {extractEnumData({
                                id: pageData[0].gender + 1,
                                enumObject: Gender,
                              })}
                            </div>
                          </li>
                        ) : (
                          ''
                        )}

                        {pageData[0].species && (
                          <li className="info-page__data-list-item">
                            <div>Species: </div>
                            <div>
                              {extractEnumData({
                                id: pageData[0].species,
                                enumObject: Species,
                              })}
                            </div>
                          </li>
                        )}
                      </ul>

                      <article className="info-article">
                        <>
                          {pageData[0].description && (
                            <div>
                              <h3 className="info-article__title">
                                Description
                              </h3>
                              <p className="info-article__text">
                                {pageData[0].description}
                              </p>
                            </div>
                          )}
                        </>
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
                endpoint="games"
                fields="name,cover.url,cover.image_id,aggregated_rating"
                filter={`id = ${
                  Array.isArray(pageData[0].games)
                    ? `(${pageData[0].games.join(',')})`
                    : pageData[0].games
                }`}
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
