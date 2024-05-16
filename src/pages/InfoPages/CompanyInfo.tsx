import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Section from '../../components/Section/Section';
import { getData } from '../../components/Api/Api';
import { TCompany } from '../../types/types';
import SectionLoading from '../../components/SectionLoading/SectionLoading';
import { formatDate, getCountryFromISO } from '../../components/Utils/Utils';
import CardsList from '../../components/CardsList/CardsList';
import Tabs from '../../components/Tabs/Tabs';
import DataNotAvailable from '../../components/DataNotAvailable/DataNotAvailable';
import ImageDummyDefault from '../../components/ImageDummies/ImageDummyDefault';

export default function CompanyInfo() {
  const { id: pageID } = useParams();
  const [pageData, setPageData] = useState<TCompany[]>();
  const [loadingInfo, setLoadingInfo] = useState(true);
  const location = useLocation();

  // Resetting loading after page change
  useEffect(() => {
    setLoadingInfo(true);
  }, [location]);

  // Fetching data
  useEffect(() => {
    getData({
      endpoint: 'companies',
      filter: `id = ${pageID}`,
      fields:
        'name,logo.image_id,published,developed,start_date,description,websites.url,country',
    })
      .then((data) => {
        setPageData(data);
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => setLoadingInfo(false));
  }, [pageID]);

  return (
    <>
      <Section title="Company info">
        <Tabs
          tabs={['Info', 'Developed games', 'Published games']}
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
                    {pageData[0].logo ? (
                      <div className="info-page__cover-holder card-flying card-flying_slide-right">
                        <img
                          className="info-page__cover-image"
                          src={`//images.igdb.com/igdb/image/upload/t_thumb_2x/${pageData[0].logo.image_id}.jpg`}
                          alt={`${pageData[0].name && pageData[0].name} logo`}
                        />
                      </div>
                    ) : (
                      <div className="info-page__cover-holder info-page__cover-holder_no-image">
                        <ImageDummyDefault />
                      </div>
                    )}
                    <div className="info-page__data-holder">
                      <ul className="info-page__data-list">
                        <li className="info-page__data-list-item">
                          <div>Foundation date:</div>
                          <div>
                            {formatDate({ timestamp: pageData[0].start_date })}
                          </div>
                        </li>

                        {pageData[0].country && (
                          <li className="info-page__data-list-item">
                            <div>Country: </div>
                            <div>
                              {getCountryFromISO({
                                isoCode: pageData[0].country,
                              })}
                            </div>
                          </li>
                        )}

                        {pageData[0].websites && (
                          <li className="info-page__data-list-item">
                            <div>Website: </div>
                            <div>
                              <a
                                href={pageData[0].websites[0].url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {pageData[0].websites[0].url}
                              </a>
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

          {/* DEVELOPED GAMES TAB */}
          <>
            {pageData && pageData[0].developed ? (
              <CardsList
                endpoint="games"
                fields="name,cover.url,cover.image_id,aggregated_rating"
                filter={`id = ${
                  Array.isArray(pageData[0].developed)
                    ? `(${pageData[0].developed.join(',')})`
                    : pageData[0].developed
                }`}
                linkPrefix="../"
                cardSize="compact"
              />
            ) : (
              <DataNotAvailable text="No developed games available" />
            )}
          </>

          {/* PUBLISHED GAMES TAB */}
          <>
            {pageData && pageData[0].published ? (
              <CardsList
                endpoint="games"
                fields="name,cover.url,cover.image_id,aggregated_rating"
                filter={`id = ${
                  Array.isArray(pageData[0].published)
                    ? `(${pageData[0].published.join(',')})`
                    : pageData[0].published
                }`}
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
