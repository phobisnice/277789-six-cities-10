import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteItem from './favorite-item';
import {makeFakeOffer, makeFakeStore} from '../../utils/mocks';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router-dom';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Test FavoriteItem component', () => {
  const mockOffer = makeFakeOffer();
  const {city: mockCity} = mockOffer;
  const store = mockStore(makeFakeStore());

  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteItem
            places={[mockOffer]}
            city={mockCity.name}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('favorite-city')).toBeInTheDocument();
    expect(screen.getAllByTestId('place-card').length).toBe(1);
  });

  it('Should redirect on "/" when user clicked to city name', async () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path="/"
              element={<h1>This is main page</h1>}
            />
            <Route
              path='*'
              element={
                <FavoriteItem
                  places={[mockOffer]}
                  city={mockCity.name}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('favorite-city'));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
