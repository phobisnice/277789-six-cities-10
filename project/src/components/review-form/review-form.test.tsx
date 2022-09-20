import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import ReviewForm from './review-form';
import {RATING_NAMES, ReviewText} from '../../const';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test ReviewForm component', () => {
  const store = mockStore();
  const fakeHotelId = '13';

  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <ReviewForm
          hotelId={fakeHotelId}
        />
      </Provider>
    );

    expect(screen.getAllByRole('radio').length).toBe(RATING_NAMES.length);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('Submit button should disabled if review incorrect', async () => {
    render(
      <Provider store={store}>
        <ReviewForm
          hotelId={fakeHotelId}
        />
      </Provider>
    );

    const veryLongText = new Array(ReviewText.Maximum + 1).fill('1').join();

    await userEvent.click(screen.getAllByRole('radio')[0]);
    expect(screen.getByRole('button')).toBeDisabled();
    await userEvent.type(screen.getByRole('textbox'), 'Short value text');
    expect(screen.getByRole('button')).toBeDisabled();
    await userEvent.type(screen.getByRole('textbox'), veryLongText);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('Form should submit if review correct', async () => {
    render(
      <Provider store={store}>
        <ReviewForm
          hotelId={fakeHotelId}
        />
      </Provider>
    );

    const correctValue = new Array(ReviewText.Minimum + 1).fill('1').join();

    await userEvent.click(screen.getAllByRole('radio')[0]);
    await userEvent.type(screen.getByRole('textbox'), correctValue);
    expect(screen.getByRole('button')).not.toBeDisabled();
    expect(screen.getByDisplayValue(correctValue)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();
    expect(actions[0].type).toContain('offer/sendComments');
  });
});
