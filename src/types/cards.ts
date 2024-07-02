import { TDataCharacter, TDataCompany, TDataGame } from './data';
import { TApiOptions } from './main';

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
  apiOptions: TApiOptions;
  linkPrefix?: TLinkPrefix;
  cardSize?: TCardSize;
};
