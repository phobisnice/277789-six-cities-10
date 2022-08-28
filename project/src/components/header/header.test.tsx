import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import Header from './header';
import {makeFakeStore, makeFakeUser} from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Test Header component',() => {

  it('Should render UserLogged when user authorize', () => {
    const fakeUser = makeFakeUser();
    const store = mockStore(makeFakeStore(fakeUser));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeTruthy();
  });

  it('Should render UserNotLogged when user not authorize', () => {
    const store = mockStore(makeFakeStore());

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeTruthy();
  });
});
