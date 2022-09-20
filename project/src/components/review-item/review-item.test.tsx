import {render, screen} from '@testing-library/react';
import ReviewItem from './review-item';
import {makeFakeReview} from '../../utils/mocks';

describe('Test ReviewItem component', () => {
  const fakeReview = makeFakeReview();
  const {user: {name}, comment} = fakeReview;

  it('Should render correctly', () => {
    render(
      <ReviewItem
        review={fakeReview}
      />
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(comment)).toBeInTheDocument();
  });
});
