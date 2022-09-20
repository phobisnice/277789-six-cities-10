import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import Room from './room';
import {AuthorizationStatus} from '../../const';
import {makeFakeOffer, makeFakeReview, makeFakeStore, makeFakeUser} from '../../utils/mocks';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test Room page component', () => {
  const fakeReview = makeFakeReview();
  const fakeOffer = makeFakeOffer();
  const {title} = fakeOffer;

  const fakeStoreWithNoAuth = {
    'OFFER': {
      offer: fakeOffer,
      comments: [fakeReview],
      nearOffers: [],
      isOfferLoading: false,
    },
    'FAVORITE': {
      wishlist: [],
      isWishlistLoading: false,
    },
    'USER': {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    }
  };

  it('Should render correctly', () => {
    const store = mockStore(fakeStoreWithNoAuth);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Room/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('room-page')).toBeInTheDocument();
    expect(screen.getByTestId('room-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('review-item')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('Should render without review form if user not authorize', () => {
    const store = mockStore(fakeStoreWithNoAuth);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Room/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('review-form')).not.toBeInTheDocument();
  });

  it('Should render with review form if user authorize', () => {
    const fakeStoreWithAuth = makeFakeStore(makeFakeUser());
    const store = mockStore(fakeStoreWithAuth);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Room/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('review-form')).toBeInTheDocument();
  });
});
