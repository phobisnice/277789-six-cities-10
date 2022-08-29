import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import Favorites from './favorites';
import {AuthorizationStatus} from '../../const';
import {makeFakeOffer} from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Test Favorites component page', () => {
  const firstCity = 'Paris';
  const secondCity = 'Cologne';
  const fakeWishlistItems = [makeFakeOffer(firstCity), makeFakeOffer(firstCity), makeFakeOffer(secondCity), makeFakeOffer(secondCity)];

  const fakeStoreData = {
    'FAVORITE': {
      wishlist: fakeWishlistItems,
      isWishlistLoading: false,
    },
    'USER': {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    }
  };

  const store = mockStore(fakeStoreData);

  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Favorites />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(firstCity)).toBeInTheDocument();
    expect(screen.getByText(secondCity)).toBeInTheDocument();
    expect(screen.getAllByTestId('favorite-city').length).toBe(2);
    expect(screen.getAllByTestId('place-card').length).toBe(fakeWishlistItems.length);
  });
});
