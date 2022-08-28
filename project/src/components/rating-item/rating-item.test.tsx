import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RatingItem from './rating-item';
import {RATING_NAMES} from '../../const';

describe('Test RatingItem component', () => {
  const ratingItemTitle = RATING_NAMES[0];

  it('Should render correctly', () => {
    const changeHandle = jest.fn();
    const ratingValue = 5;

    render(
      <RatingItem
        value={ratingValue}
        title={ratingItemTitle}
        ratingChangeHandle={changeHandle}
      />
    );

    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getByTitle(ratingItemTitle)).toBeInTheDocument();
    expect(screen.getByDisplayValue(ratingValue)).toBeInTheDocument();
  });

  it('onChange should called when user click on item', async () => {
    const changeHandle = jest.fn();
    const ratingValue = 5;

    render(
      <RatingItem
        value={ratingValue}
        title={ratingItemTitle}
        ratingChangeHandle={changeHandle}
      />
    );

    await userEvent.click(screen.getByDisplayValue(ratingValue));
    expect(changeHandle).toBeCalled();
    expect(changeHandle).toBeCalledTimes(1);
    expect(screen.getByRole('radio')).toBeChecked();
  });
});
