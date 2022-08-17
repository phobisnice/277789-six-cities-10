import {Reviews} from '../../types/review';
import ReviewItem from '../review-item/review-item';
import {MAX_REVIEWS_COUNT} from '../../const';

type ReviewsListProps = {
  reviews: Reviews
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {
        reviews.slice(0, MAX_REVIEWS_COUNT).map((review) => <ReviewItem review={review} key={review.id} />)
      }
    </ul>
  );
}

export default ReviewsList;
