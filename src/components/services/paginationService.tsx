import { intRange } from '../../utils/utils';

export const PaginationService = {
  createPagesRange(
    currentPage: number,
    pagesLimit: number,
    pagesCount: number
  ) {
    // First chunk
    if (currentPage < pagesLimit) {
      return intRange(1, pagesLimit);
      // Last chunk
    } else if (currentPage >= pagesCount - (pagesLimit - 2)) {
      return intRange(pagesCount - (pagesLimit - 1), pagesCount);
      // Middle chunk
    } else {
      const halfLength = Math.floor(pagesLimit / 2);
      const isLengthOdd = pagesLimit % 2 !== 0;
      const leftSide = isLengthOdd ? halfLength : halfLength - 1; // Amount of pages before current
      const rightSide = halfLength; // Amount of pages after current

      return intRange(currentPage - leftSide, currentPage + rightSide);
    }
  },
};
