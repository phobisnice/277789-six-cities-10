import {render, screen} from '@testing-library/react';
import ReviewsList from './reviews-list';
import {makeFakeReview} from '../../utils/mocks';
import {MAX_REVIEWS_COUNT} from '../../const';

describe('Test ReviewList component', () => {
  const fakeReviews = new Array(MAX_REVIEWS_COUNT + 1)
    .fill('')
    .map(() => makeFakeReview());

  it('Should render correctly', () => {
    render(
      <ReviewsList
        reviews={fakeReviews}
      />
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(MAX_REVIEWS_COUNT);
  });
});
