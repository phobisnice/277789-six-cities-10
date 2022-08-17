import {ChangeEvent} from 'react';

type RatingItemProps = {
  value: number;
  title: string;
  ratingChangeHandle: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function RatingItem({value, title, ratingChangeHandle}: RatingItemProps): JSX.Element {
  const id = value + (value > 1 ? '-stars' : '-star');
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={value} id={id}
        type="radio" onChange={ratingChangeHandle}
      />
      <label htmlFor={id} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default RatingItem;
