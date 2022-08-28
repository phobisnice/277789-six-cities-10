import {render, screen} from '@testing-library/react';
import HeaderWrapper from './header-wrapper';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';

const history = createMemoryHistory();

describe('Test HeaderWrapper component', () => {
  it('Should render correctly', () => {
    render(
      <HistoryRouter history={history} >
        <HeaderWrapper>
          <p>test render</p>
        </HeaderWrapper>
      </HistoryRouter>
    );

    expect(screen.getByText(/test render/i)).toBeInTheDocument();
    expect(screen.getByTestId('header-wrapper')).toBeInTheDocument();
  });
});
