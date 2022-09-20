import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import {Route, Routes} from 'react-router-dom';
import Logo from './logo';

const history = createMemoryHistory();

describe('Test Logo component', () => {
  it('Should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByTestId('logo-link')).toBeInTheDocument();
  });

  it('Should redirect to root url when user clicked to link', async () => {
    history.push('/fake-url');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='/'
            element={<h1>This is main page</h1>}
          />
          <Route
            path='*'
            element={<Logo />}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('logo-link'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
