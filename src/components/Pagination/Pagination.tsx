import { type TPaginationProps } from '../../types/pagination';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Pagination({
  pagesAmount,
  pagesLimit = 9, // Odd numbers look better
  currentPage,
}: TPaginationProps) {
  const [pagesRender, setPagesRender] = useState<JSX.Element[]>([]);

  function fillPagesArray(
    pagesArray: JSX.Element[],
    page: number,
    currentPage: number
  ): JSX.Element[] {
    pagesArray.push(
      <li className="pagination__item" key={`page_${page}`}>
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

  useEffect(() => {
    let pagesArray: JSX.Element[] = [];
    // TODO: I probably should create an abstraction for these two
    let elementDotsStart = (
      <li className="pagination__item" key="page_dots_start">
        ...
      </li>
    );
    let elementDotsEnd = (
      <li className="pagination__item" key="page_dots_end">
        ...
      </li>
    );

    console.log(pagesArray);

    if (pagesAmount > 0) {
      if (currentPage < pagesLimit) {
        // First chunk of pages
        for (let i = 1; i <= pagesLimit; i++) {
          if (i > pagesAmount) break;
          fillPagesArray(pagesArray, i, currentPage);
        }

        // Adding dots at the end
        pagesArray.push(elementDotsEnd);
      } else if (currentPage >= pagesAmount - (pagesLimit - 2)) {
        // Last chunk of pages
        for (let i = pagesAmount - (pagesLimit - 1); i <= pagesAmount; i++) {
          fillPagesArray(pagesArray, i, currentPage);
        }

        // Adding dots at the beginning
        pagesArray.unshift(elementDotsStart);
      } else {
        // Middle chunk of pages
        const halfLength = Math.floor(pagesLimit / 2);
        const isLengthOdd = pagesLimit % 2 !== 0;
        const leftSide = isLengthOdd ? halfLength : halfLength - 1; // Amount of pages before current
        const rightSide = halfLength; // Amount of pages after current

        for (
          let i = currentPage - leftSide;
          i <= currentPage + rightSide;
          i++
        ) {
          fillPagesArray(pagesArray, i, currentPage);
        }

        // Adding dots at the beginning and end
        pagesArray.unshift(elementDotsStart);
        pagesArray.push(elementDotsEnd);
      }
    }

    setPagesRender(pagesArray);
  }, [currentPage, pagesAmount, pagesLimit]);

  return (
    <ul className="pagination">
      {pagesAmount > pagesLimit && (
        <>
          {/* 'FIRST' LINK */}
          <li className="pagination__item" key="page_first">
            <Link
              className={`pagination__link ${
                currentPage < pagesLimit ? 'inactive' : ''
              }`}
              to={`#page=${1}`}
              title="Go to the first page"
            >
              {'<<'}First
            </Link>
          </li>

          {/* 'PREV' LINK */}
          <li className="pagination__item" key="page_prev">
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

      {/* PAGES */}
      {pagesRender.length > 0 ? pagesRender.map((page) => page) : ''}

      {pagesAmount > pagesLimit && (
        <>
          {/* 'NEXT' LINK */}
          <li className="pagination__item" key="page_next">
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

          {/* 'LAST' LINK */}
          <li className="pagination__item" key="page_last">
            <Link
              className={`pagination__link ${
                currentPage >= pagesAmount - (pagesLimit - 2) ? 'inactive' : ''
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
