import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TPaginationProps } from '../../types/types';

export default function Pagination({
  keyID,
  pagesAmount,
  currentPage,
}: TPaginationProps) {
  const [pagesRender, setPagesRender] = useState<JSX.Element[]>([]);
  const length = 10;

  useEffect(() => {
    function fillPagesArray(
      pagesArray: JSX.Element[],
      page: number,
      currentPage: number
    ): JSX.Element[] {
      pagesArray.push(
        <li className="pagination__item" key={`${keyID}_${page}`}>
          <Link
            className={`pagination__link ${
              currentPage === page ? 'active' : ''
            }`}
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
  }, [keyID, currentPage, pagesAmount]);

  return (
    <ul className="pagination">
      <li className="pagination__item" key={`${keyID}_first`}>
        <Link
          className={`pagination__link ${currentPage === 1 ? 'inactive' : ''}`}
          to={`#page=${1}`}
        >
          {'<<'}First
        </Link>
      </li>

      <li className="pagination__item" key={`${keyID}_prev`}>
        <Link
          className={`pagination__link ${currentPage === 1 ? 'inactive' : ''}`}
          to={`#page=${currentPage - 1}`}
        >
          {'<'}Prev
        </Link>
      </li>

      {pagesRender.length > 0 ? pagesRender.map((page) => page) : ''}

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
    </ul>
  );
}
