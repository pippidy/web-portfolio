import { TDataCharacter, TDataCompany, TDataGame } from './data';

export type TLinkPrefix = '../' | '';

export type TCardSize = 'default' | 'compact' | 'mini';

export type TCard = {
  linkPrefix?: TLinkPrefix;
};

export type TGameCardProps = TCard &
  TDataGame & {
    cardSize?: TCardSize;
  };

export type TCompanyCardProps = TCard & TDataCompany;

export type TCharacterCardProps = TCard & TDataCharacter;

export type TCardsListProps = {
  endpoint?: string;
  search?: string;
  fields?: string;
  limit?: number;
  sort?: string;
  filter?: string;
  offset?: number;
  linkPrefix?: TLinkPrefix;
  cardSize?: TCardSize;
};
