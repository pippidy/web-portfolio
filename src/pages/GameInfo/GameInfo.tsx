import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Section from '../../components/Section/Section';
import { getDataByID } from '../../components/Api/Api';
import { TGame } from '../../types/types';
import SectionLoading from '../../components/SectionLoading/SectionLoading';
import { EnumMonthsShort } from '../../components/Utils/Data';
import { extractEnumData } from '../../components/Utils/Utils';

export default function GameInfo() {
  const { id: pageID } = useParams();
  const [pageData, setPageData] = useState<TGame[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataByID({
      endpoint: 'games',
      id: pageID,
      fields:
        'name,cover.image_id,aggregated_rating,release_dates.m,release_dates.y,summary,storyline',
    })
      .then((data) => {
        setPageData(data);
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => setLoading(false));
  }, [pageID]);

  return (
    <Section title="Game info">
      <div className="info-page">
        {loading ? (
          <SectionLoading />
        ) : (
          <>
            <h2 className="title-tertiary">
              {pageData ? pageData[0].name : ''}
            </h2>

            <section className="info-page__content">
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
                        ? Number(pageData[0].aggregated_rating?.toFixed(1))
                        : '?'}
                    </div>
                  </li>
                  <li className="info-page__data-list-item">
                    <div>Release date: </div>
                    <div>
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
            </section>
          </>
        )}
      </div>
    </Section>
  );
}
