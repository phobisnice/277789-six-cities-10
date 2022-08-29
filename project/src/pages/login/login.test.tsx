import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import Login from './login';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test Login page component',() => {
  const store = mockStore();

  it('Should render correctly', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Sign in');
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), '123456');

    expect(screen.getByDisplayValue(/test@test.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it('Should not dispatch login action if value in inputs incorrect', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), '123456');
    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();
    expect(actions.length).toBeFalsy();
  });

  it('Should dispatch login action if value in inputs correct', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'a123456');
    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();
    expect(actions[0].type).toContain('user/login');
  });
});
