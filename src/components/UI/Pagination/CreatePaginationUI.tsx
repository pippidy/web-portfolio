import { type TCreatePaginationUIProps } from '../../../types/pagination';
import React from 'react';
import { Link } from 'react-router-dom';
import { PaginationService } from '../../services/paginationService';
import cn from 'classnames';

function CreatePaginationUI({
  pagesCount,
  pagesLimit = 9, // Odd numbers look better
  currentPage,
}: TCreatePaginationUIProps) {
  const pagesRange = PaginationService.createPagesRange(
    currentPage,
    pagesLimit,
    pagesCount
  );

  return (
    <ul className="pagination">
      {pagesCount > pagesLimit && (
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

      {/* DOTS BEFORE */}
      {pagesRange[0] > Math.floor(pagesLimit / 2) && (
        <li className="pagination__item" key={`page_dots_1`}>
          ...
        </li>
      )}

      {/* PAGES */}
      {pagesRange.length > 0
        ? pagesRange.map((page) => {
            const classLink = cn('pagination__link', {
              current: currentPage === page,
              accent:
                (page === pagesRange.at(0) || page === pagesRange.at(-1)) &&
                currentPage !== page,
            });

            return (
              <li className="pagination__item" key={`${page}`}>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  className={classLink}
                  to={`#page=${page}`}
                  title={`Go to page ${page}`}
                >
                  {page}
                </Link>
              </li>
            );
          })
        : ''}

      {/* DOTS AFTER */}
      {pagesRange.at(-1) !== pagesCount && (
        <li className="pagination__item" key={`page_dots_2`}>
          ...
        </li>
      )}

      {pagesCount > pagesLimit && (
        <>
          {/* 'NEXT' LINK */}
          <li className="pagination__item" key="page_next">
            <Link
              className={`pagination__link ${
                currentPage === pagesCount ? 'inactive' : ''
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
                currentPage >= pagesCount - (pagesLimit - 2) ? 'inactive' : ''
              }`}
              to={`#page=${pagesCount}`}
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

export default React.memo(CreatePaginationUI);
