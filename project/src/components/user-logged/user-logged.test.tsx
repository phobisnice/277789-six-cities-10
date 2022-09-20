import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Route, Routes} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import UserLogged from './user-logged';
import {makeFakeUser} from '../../utils/mocks';
import {AppRoute} from '../../const';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test UserLogged component', () => {
  const store = mockStore();
  const wishlistCount = 6;
  const {email, avatarUrl} = makeFakeUser();

  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserLogged
            wishlistCount={wishlistCount}
            email={email}
            avatar={avatarUrl}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByRole('link').length).toBe(2);
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();
    expect(screen.getByText(wishlistCount)).toBeInTheDocument();
  });

  it('Should redirect to favorite url when user clicked to avatar or user email', async () => {
    history.push('/fake-url');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={<h1>This is favorite page</h1>}
            />
            <Route
              path="/fake-url"
              element={
                <UserLogged
                  wishlistCount={wishlistCount}
                  email={email}
                  avatar={avatarUrl}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('login-wishlist-link'));

    expect(screen.getByText(/This is favorite page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });

  it('Should dispatch logout when user click on Sign out link', async () => {
    history.push('/fake-url');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserLogged
            wishlistCount={wishlistCount}
            email={email}
            avatar={avatarUrl}
          />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('login-signout-link'));

    const actions = store.getActions();
    expect(actions[0].type).toContain('user/logout');
  });
});
