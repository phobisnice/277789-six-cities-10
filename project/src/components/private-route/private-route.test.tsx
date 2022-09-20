import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from './private-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Test PrivateRoute component', () => {
  it('Should render Login page, when user not authorized and try open Login page', () => {
    history.push(AppRoute.Login);
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<h1>This is root page</h1>}
            />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute
                  authorizationStatus={AuthorizationStatus.NoAuth}
                  isLoginPage
                >
                  <h1>This is login page</h1>
                </PrivateRoute>
              }
            />
            <Route
              path={'/private'}
              element={
                <PrivateRoute
                  authorizationStatus={AuthorizationStatus.NoAuth}
                >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/This is root page/i)).not.toBeInTheDocument();
  });

  it('Should render Login page, when user not authorized and try open another private route', () => {
    history.push('/private');
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<h1>This is root page</h1>}
            />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute
                  authorizationStatus={AuthorizationStatus.NoAuth}
                  isLoginPage
                >
                  <h1>This is login page</h1>
                </PrivateRoute>
              }
            />
            <Route
              path={'/private'}
              element={
                <PrivateRoute
                  authorizationStatus={AuthorizationStatus.NoAuth}
                >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/This is root page/i)).not.toBeInTheDocument();
  });

  it('Should render Private route, when user authorized and try open private route', () => {
    history.push('/private');
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<h1>This is root page</h1>}
            />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute
                  authorizationStatus={AuthorizationStatus.Auth}
                  isLoginPage
                >
                  <h1>This is login page</h1>
                </PrivateRoute>
              }
            />
            <Route
              path={'/private'}
              element={
                <PrivateRoute
                  authorizationStatus={AuthorizationStatus.Auth}
                >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/This is root page/i)).not.toBeInTheDocument();
  });

  it('Should render root page, when user authorized and try open login page', () => {
    history.push(AppRoute.Login);
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<h1>This is root page</h1>}
            />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute
                  authorizationStatus={AuthorizationStatus.Auth}
                  isLoginPage
                >
                  <h1>This is login page</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/This is root page/i)).toBeInTheDocument();
    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();
  });
});
