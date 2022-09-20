import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import {Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import PlaceCard from './place-card';
import {PlaceCardType, PreviewSize} from '../../const';
import {makeFakeOffer, makeFakeStore} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Test PlaceCard component', () => {
  const fakeOffer = makeFakeOffer();
  const store = mockStore(makeFakeStore());

  it('Should render correctly', () => {
    const hoverHandle = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard
            info={fakeOffer}
            kind={PlaceCardType.City}
            onHoverHandle={hoverHandle}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('place-card')).toBeInTheDocument();
    expect(screen.getByRole('img').getAttribute('width')).toBe(PreviewSize.NormalItemWidth);
    expect(screen.getByRole('img').getAttribute('height')).toBe(PreviewSize.NormalItemHeight);
  });

  it('onHoverHandle should called when user hover and un hover on place card', async () => {
    const hoverHandle = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard
            info={fakeOffer}
            kind={PlaceCardType.City}
            onHoverHandle={hoverHandle}
          />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.hover(screen.getByTestId('place-card'));
    await userEvent.unhover(screen.getByTestId('place-card'));
    expect(hoverHandle).toBeCalled();
    expect(hoverHandle).nthCalledWith(1, fakeOffer.id);
    expect(hoverHandle).nthCalledWith(2, 0);
  });

  it('Should redirect on room detail page when user clicked to offer link', async () => {
    history.push('/fake-url');
    const hoverHandle = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`/offer/:${fakeOffer.id}`}
              element={<h1>This is offer page</h1>}
            />
            <Route
              path="*"
              element={
                <PlaceCard
                  info={fakeOffer}
                  kind={PlaceCardType.City}
                  onHoverHandle={hoverHandle}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('card-title-link'));

    expect(screen.getByText(/This is offer page/i)).toBeInTheDocument();
  });
});

