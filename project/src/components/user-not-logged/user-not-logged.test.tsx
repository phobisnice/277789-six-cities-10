import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import {Route, Routes} from 'react-router-dom';
import UserNotLogged from './user-not-logged';
import {AppRoute} from '../../const';

const history = createMemoryHistory();

describe('Test UserNotLogged component', () => {
  it('Should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <UserNotLogged />
      </HistoryRouter>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('Should redirect to login url when user clicked to link', async () => {
    history.push('/fake-url');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Login}
            element={<h1>This is login page</h1>}
          />
          <Route
            path='*'
            element={<UserNotLogged />}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
  });
});
