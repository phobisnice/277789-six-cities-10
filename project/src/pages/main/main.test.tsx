import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import Main from './main';
import {CITIES, PlaceCount} from '../../const';
import {makeFakeOffer, makeFakeStore, makeFakeUser} from '../../utils/mocks';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test Main page component', () => {
  const [defaultCity, secondCity] = CITIES;
  const moreThenMaxPlacesOnPage = PlaceCount.City + 1;

  const defaultPlaces = new Array(moreThenMaxPlacesOnPage)
    .fill('')
    .map(() => makeFakeOffer(defaultCity.name));

  const secondCityPlaces = new Array(PlaceCount.City)
    .fill('')
    .map(() => makeFakeOffer(secondCity.name));

  const mockPlaces = [...defaultPlaces, ...secondCityPlaces];

  it('Should render correctly with places', () => {
    const fakeStoreWithPlaces = makeFakeStore(makeFakeUser(), mockPlaces);
    const store = mockStore(fakeStoreWithPlaces);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(`${defaultPlaces.length} places to stay in ${defaultCity.name}`)).toBeInTheDocument();
    expect(screen.getAllByTestId('place-card').length).toBe(PlaceCount.City);
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.queryByText(/No places to stay available/i)).not.toBeInTheDocument();
  });

  it('Should render correctly without places', () => {
    const fakeStoreWithoutPlaces = makeFakeStore(makeFakeUser());
    const store = mockStore(fakeStoreWithoutPlaces);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.queryByText(`${defaultPlaces.length} places to stay in ${defaultCity.name}`)).not.toBeInTheDocument();
    expect(screen.queryAllByTestId('place-card').length).toBe(0);
    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
    expect(screen.queryByText(/Sort by/i)).not.toBeInTheDocument();
  });
});
