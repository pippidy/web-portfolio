import { type TCardsListProps } from '../../../types/cards';
import useGetData from '../../hooks/useGetData';
import CardsRender from '../CardsRender/CardsRender';

export default function CardsList({
  apiOptions,
  linkPrefix,
  cardSize,
}: TCardsListProps) {
  const { endpoint: cardType } = apiOptions;
  const { data, loading, error } = useGetData({
    ...apiOptions,
  });

  return (
    <>
      <CardsRender
        data={data}
        loading={loading}
        error={error}
        cardSize={cardSize}
        cardType={cardType}
        linkPrefix={linkPrefix}
      />
    </>
  );
}
