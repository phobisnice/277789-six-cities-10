import {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import {api} from '../../store';
import {APIRoute, RATING_NAMES} from '../../const';
import {loadComments} from '../../store/action';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import RatingItem from '../rating-item/rating-item';

type ReviewFormProps = {
  hotelId: string | undefined
}

function ReviewForm({hotelId}: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState({
    rating: '',
    review: '',
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(!(formData.review.length >= 50 && formData.rating));
  }, [formData]);

  const reviewChangeHandle = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const reviewSubmitHandle = (evt: FormEvent) => {
    evt.preventDefault();

    setIsButtonDisabled(true);
    const reviewSubmitUrl = `${APIRoute.Comments}/${hotelId}`;
    api.post(reviewSubmitUrl, {
      comment: formData.review,
      rating: formData.rating
    })
      .then((response) => {
        dispatch(loadComments(response.data));
        setFormData({...formData, rating: '', review: ''});
        formRef.current?.reset();
      })
      .catch(() => {
        setIsButtonDisabled(false);
      });
  };

  return (
    <form className="reviews__form form" action="/" method="post" ref={formRef} onSubmit={reviewSubmitHandle}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_NAMES.map((name) => {
          const ratingValue = Math.abs(RATING_NAMES.indexOf(name) - RATING_NAMES.length);
          return <RatingItem value={ratingValue} title={name} ratingChangeHandle={reviewChangeHandle} key={`form-rating-${ratingValue}`} />;
        })}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={reviewChangeHandle}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isButtonDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
