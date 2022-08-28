import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import {AppRoute} from '../../const';
import {createApi} from '../../services/api';
import thunk from 'redux-thunk';
import {makeFakeUser, makeFakeStore} from '../../utils/mocks';

describe('Test App component', () => {
  const api = createApi();
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore(middlewares);

  describe('Test app routing when user not authorization', () => {
    const store = mockStore(makeFakeStore());
    const history = createMemoryHistory();

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    it('Should render "Main" page when user navigate to "/"', () => {
      history.push(AppRoute.Root);

      render(fakeApp);
      expect(screen.getByTestId('main-page')).toBeInTheDocument();
    });

    it('Should render "Login" page when user navigate to "/login" and user not authorize', () => {
      history.push(AppRoute.Login);

      render(fakeApp);
      expect(screen.getByTestId('login-page')).toBeInTheDocument();
      expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });

    it('Should render "Login" page when user navigate to "/favorites" and user not authorize', () => {
      history.push(AppRoute.Favorites);

      render(fakeApp);
      expect(screen.getByTestId('login-page')).toBeInTheDocument();
      expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });

    it('Should render "Room" page when user navigate to "/offer/:id"', () => {
      history.push(AppRoute.Room);

      render(fakeApp);
      expect(screen.getByTestId('room-page')).toBeInTheDocument();
    });

    it('Should render "NotFound" page when user navigate non-existent route', () => {
      history.push('/non-existent-route');

      render(fakeApp);
      expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
      expect(screen.getByText('404 Not Found')).toBeInTheDocument();
      expect(screen.getByText('Back to Home Page')).toBeInTheDocument();
    });

    it('Should render "Loader" when user navigate to "/" and checking auth status unknown', () => {
      history.push(AppRoute.Root);

      render(fakeApp);
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  describe('Test app routing when user has authorization', () => {
    const fakeStore = makeFakeStore(makeFakeUser());
    const store = mockStore(fakeStore);

    const history = createMemoryHistory();

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App/>
        </HistoryRouter>
      </Provider>
    );

    it('Should render "Main" page when user navigate to "/login" with authorization', () => {
      history.push(AppRoute.Root);

      render(fakeApp);
      expect(screen.getByTestId('main-page')).toBeInTheDocument();
    });

    it('Should render "Favorites" page when user navigate to "/favorites" with authorization', () => {
      history.push(AppRoute.Favorites);

      render(fakeApp);
      expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
    });
  });
});
