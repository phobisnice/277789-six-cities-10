import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Route, Routes} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import WishlistButton from './wishlist-button';
import {AppRoute, WishlistType} from '../../const';
import {makeFakeStore, makeFakeUser} from '../../utils/mocks';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test WishlistButton component', () => {
  const mockOfferId = 6;

  it('Should render correctly', () => {
    const fakeStoreDate = makeFakeStore();
    const store = mockStore(fakeStoreDate);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <WishlistButton
            isFavorite
            type={WishlistType.Offer}
            offerId={mockOfferId}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
  });


  it('Should redirect on /login when non-authorized user click on button', async () => {
    const fakeStoreDate = makeFakeStore();
    const store = mockStore(fakeStoreDate);
    history.push('/fake-url');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>This is login page</h1>}
            />
            <Route
              path="*"
              element={
                <WishlistButton
                  isFavorite={false}
                  type={WishlistType.Offer}
                  offerId={mockOfferId}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
  });

  it('Should dispatch wishlist add action and stay on page when authorized user click on button', async () => {
    const fakeUser = makeFakeUser();
    const fakeStoreDate = makeFakeStore(fakeUser);
    const store = mockStore(fakeStoreDate);
    history.push('/fake-url');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>This is login page</h1>}
            />
            <Route
              path="*"
              element={
                <WishlistButton
                  isFavorite={false}
                  type={WishlistType.Offer}
                  offerId={mockOfferId}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/In bookmarks/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();

    expect(actions[0].type).toContain('favorite/addToWishlist');
    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();
    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
  });

  it('Should dispatch wishlist remove action when authorized user click on button', async () => {
    const fakeUser = makeFakeUser();
    const fakeStoreDate = makeFakeStore(fakeUser);
    const store = mockStore(fakeStoreDate);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <WishlistButton
            isFavorite
            type={WishlistType.Offer}
            offerId={mockOfferId}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/To bookmarks/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();

    expect(actions[0].type).toContain('favorite/removeFromWishlist');
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
  });
});
