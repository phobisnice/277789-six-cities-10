import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import {Provider} from 'react-redux';
import PlacesList from './places-list';
import {PlaceCardType} from '../../const';
import {makeFakeOffer, makeFakeStore} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';

const history = createMemoryHistory();

describe('Test PlacesList component', () => {
  const mockStore = configureMockStore();
  const store = mockStore(makeFakeStore());
  const fakeOffersCount = 5;
  const fakeOffers = new Array(fakeOffersCount).fill('').map(() => makeFakeOffer());

  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlacesList
            places={fakeOffers}
            kind={PlaceCardType.City}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByTestId('place-card').length).toBe(fakeOffersCount);
  });
});
