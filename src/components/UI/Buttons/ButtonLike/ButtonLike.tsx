import { useState } from 'react';
import cn from 'classnames';

// @ts-expect-error
import { ReactComponent as HeartIcon } from '../../../../assets/svg/heart.svg';

export default function ButtonLike() {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  function onLikeClick() {
    setIsLiked((prevState) => (prevState = !prevState));
    setLikeCount((prevState) => {
      if (!isLiked) {
        return (prevState += 1);
      } else {
        return (prevState -= 1);
      }
    });
  }

  // Classnames
  const classHeart = cn('heart-icon', { liked: isLiked });

  return (
    <div className="button-like">
      <button onClick={onLikeClick} title="Like game">
        <HeartIcon className={classHeart} width="2.1em" height="2.1em" />{' '}
        {likeCount}
      </button>

      <div className="button-like__notification">Not implemented yet!</div>
    </div>
  );
}
