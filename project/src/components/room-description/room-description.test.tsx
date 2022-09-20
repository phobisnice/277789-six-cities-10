import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import RoomDescription from './room-description';
import {makeFakeOffer, makeFakeStore} from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Test RoomDescription component', () => {
  const fakeDataStore = makeFakeStore();
  const store = mockStore(fakeDataStore);
  const fakeOffer = makeFakeOffer();
  const {title, price} = fakeOffer;

  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RoomDescription
            offer={fakeOffer}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes(String(price)))).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/What.s inside/i)).toBeInTheDocument();
  });
});
