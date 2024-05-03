import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TPagination } from '../../types/types';

export default function Pagination({
  keyID,
  pagesAmount,
  currentPage,
  length = 11,
}: TPagination) {
  const [pagesRender, setPagesRender] = useState<JSX.Element[]>([]);

  useEffect(() => {
    function fillPagesArray(
      pagesArray: JSX.Element[],
      page: number,
      currentPage: number
    ): JSX.Element[] {
      pagesArray.push(
        <li className="pagination__item" key={`${keyID}_${page}`}>
          <Link
            onClick={() => window.scrollTo(0, 0)}
            className={`pagination__link ${currentPage === page && 'current'}`}
            to={`#page=${page}`}
          >
            {page}
          </Link>
        </li>
      );

      return pagesArray;
    }

    function createPagination() {
      let pagesArray: JSX.Element[] = [];

      if (currentPage < length) {
        // First chunk of pages
        for (let i = 1; i <= length; i++) {
          if (i > pagesAmount) break;
          fillPagesArray(pagesArray, i, currentPage);
        }
      } else if (currentPage >= pagesAmount) {
        // Last chunk of pages
        for (let i = currentPage - (length - 1); i <= pagesAmount; i++) {
          fillPagesArray(pagesArray, i, currentPage);
        }
      } else {
        // Chunks inbetween
        for (let i = currentPage - (length - 2); i <= currentPage + 1; i++) {
          fillPagesArray(pagesArray, i, currentPage);
        }
      }

      setPagesRender(pagesArray);
    }

    createPagination();
  }, [keyID, currentPage, pagesAmount, length]);

  return (
    <ul className="pagination">
      {/* First and Prev links */}
      {pagesAmount > length ? (
        <>
          <li className="pagination__item" key={`${keyID}_first`}>
            <Link
              className={`pagination__link ${
                currentPage < length ? 'inactive' : ''
              }`}
              to={`#page=${1}`}
            >
              {'<<'}First
            </Link>
          </li>

          <li className="pagination__item" key={`${keyID}_prev`}>
            <Link
              className={`pagination__link ${
                currentPage === 1 ? 'inactive' : ''
              }`}
              to={`#page=${currentPage - 1}`}
            >
              {'<'}Prev
            </Link>
          </li>
        </>
      ) : (
        ''
      )}

      {/* Pages */}
      {pagesRender.length > 0 ? pagesRender.map((page) => page) : ''}

      {/* Last and Next links */}
      {pagesAmount > 10 ? (
        <>
          <li className="pagination__item" key={`${keyID}_next`}>
            <Link
              className={`pagination__link ${
                currentPage === pagesAmount ? 'inactive' : ''
              }`}
              to={`#page=${currentPage + 1}`}
            >
              Next{'>'}
            </Link>
          </li>
          <li className="pagination__item" key={`${keyID}_last`}>
            <Link
              className={`pagination__link ${
                currentPage === pagesAmount ? 'inactive' : ''
              }`}
              to={`#page=${pagesAmount}`}
            >
              Last{'>>'}
            </Link>
          </li>
        </>
      ) : (
        ''
      )}
    </ul>
  );
}
