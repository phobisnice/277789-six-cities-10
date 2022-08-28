import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import NotFound from './not-found';
import {makeFakeStore} from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Test NotFound page component', () => {
  const fakeStoreData = makeFakeStore();
  const store = mockStore(fakeStoreData);

  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFound />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to Home Page/i)).toBeInTheDocument();
  });

  it('Should redirect to root url when user clicked to Back to Home Page', async () => {
    history.push('/fake-url');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/'
              element={<h1>This is main page</h1>}
            />
            <Route
              path='*'
              element={<NotFound />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText(/Back to Home Page/i));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
