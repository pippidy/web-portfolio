import { TCardSize, TLinkPrefix } from '../../types/cards';
import { TDataFull } from '../../types/data';
import { TEndpoint, TError } from '../../types/main';

export type TCardsRenderProps = {
  data: TDataFull[] | undefined;
  loading: boolean;
  error: TError | undefined;
  cardType: TEndpoint;
  cardSize?: TCardSize;
  linkPrefix?: TLinkPrefix;
};
