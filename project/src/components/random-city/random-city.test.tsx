import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import {Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import RandomCity from './random-city';
import {makeFakeStore} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute, CITIES} from '../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Test RandomCity component', () => {
  const store = mockStore(makeFakeStore());
  const cityNames = CITIES.map((item) => item.name);

  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RandomCity />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(cityNames).toContain(screen.getByRole('link').textContent);
  });

  it('Should redirect to root url and dispatch change city when user clicked to link', async () => {
    history.push('/fake-url');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<h1>This is root page</h1>}
            />
            <Route
              path='*'
              element={<RandomCity />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is root page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('link'));

    const actions = store.getActions();
    expect(actions[0].type).toBe('HOTELS/changeCity');
    expect(screen.getByText(/This is root page/i)).toBeInTheDocument();
  });
});
