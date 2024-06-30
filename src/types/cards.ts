import { TDataCharacter, TDataCompany, TDataGame } from './data';

export type TLinkPrefix = '../' | '';

export type TCardSize = 'default' | 'compact' | 'mini';

export type TCard = {
  linkPrefix?: TLinkPrefix;
};

export type TGameCard = TCard &
  TDataGame & {
    cardSize?: TCardSize;
  };

export type TCompanyCard = TCard & TDataCompany;

export type TCharacterCard = TCard & TDataCharacter;

export type TCardsList = {
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
