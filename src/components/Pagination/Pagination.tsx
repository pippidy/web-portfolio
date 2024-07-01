import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TPaginationProps } from '../../types/pagination';

function Pagination({
  pagesAmount,
  currentPage,
  length = 11, // Odd numbers look better
}: TPaginationProps) {
  const [pagesRender, setPagesRender] = useState<JSX.Element[]>([]);

  useEffect(() => {
    function fillPagesArray(
      pagesArray: JSX.Element[],
      page: number,
      currentPage: number
    ): JSX.Element[] {
      pagesArray.push(
        <li className="pagination__item" key={`pag_${page}`}>
          <Link
            onClick={() => window.scrollTo(0, 0)}
            className={`pagination__link ${currentPage === page && 'current'}`}
            to={`#page=${page}`}
            title={`Go to page ${page}`}
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
        // Middle chunk of pages
        const halfLength = Math.floor(length / 2);
        const isLengthOdd = length % 2 !== 0;
        const leftSide = isLengthOdd ? halfLength : halfLength - 1; // Amount of pages before current
        const rightSide = halfLength; // Amount of pages after current

        for (
          let i = currentPage - leftSide;
          i <= currentPage + rightSide;
          i++
        ) {
          fillPagesArray(pagesArray, i, currentPage);
        }
      }

      setPagesRender(pagesArray);
    }

    createPagination();
  }, [currentPage, pagesAmount, length]);

  return (
    <ul className="pagination">
      {/* First and Prev links */}
      {pagesAmount > length && (
        <>
          <li className="pagination__item" key="pag_first">
            <Link
              className={`pagination__link ${
                currentPage < length ? 'inactive' : ''
              }`}
              to={`#page=${1}`}
              title="Go to the first page"
            >
              {'<<'}First
            </Link>
          </li>

          <li className="pagination__item" key="pag_prev">
            <Link
              className={`pagination__link ${
                currentPage === 1 ? 'inactive' : ''
              }`}
              to={`#page=${currentPage - 1}`}
              title="Go to the previous page"
            >
              {'<'}Prev
            </Link>
          </li>
        </>
      )}

      {/* Pages */}
      {pagesRender.length > 0 ? pagesRender.map((page) => page) : ''}

      {/* Last and Next links */}
      {pagesAmount > 10 && (
        <>
          <li className="pagination__item" key="pag_next">
            <Link
              className={`pagination__link ${
                currentPage === pagesAmount ? 'inactive' : ''
              }`}
              to={`#page=${currentPage + 1}`}
              title="Go to the next page"
            >
              Next{'>'}
            </Link>
          </li>

          <li className="pagination__item" key="pag_last">
            <Link
              className={`pagination__link ${
                currentPage === pagesAmount ? 'inactive' : ''
              }`}
              to={`#page=${pagesAmount}`}
              title="Go to the last page"
            >
              Last{'>>'}
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default React.memo(Pagination);
