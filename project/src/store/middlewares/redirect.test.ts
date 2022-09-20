import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from 'redux';
import {redirect} from './redirect';
import {redirectToRoute} from '../action';
import {APIRoute, AppRoute} from '../../const';
import {State} from '../../types/state';
import {createApi} from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {getOfferAction} from '../api-actions';

const fakeHistory = {
  location: {
    pathname: ''
  },
  push(path: string) {
    this.location.pathname = path;
  }
};

jest.mock('../../browser-history', () => fakeHistory);

describe('Test redirect middleware', () => {
  const api = createApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api), redirect];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  beforeEach(() => {
    fakeHistory.push('');
  });

  it('Should redirect to /login', () => {
    const store = mockStore();
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Login)
    ]);
  });

  it('Should not redirect to /login on invalid action', () => {
    const store = mockStore();
    store.dispatch({type: 'INVALID_ACTION', payload: AppRoute.Login});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Login);
  });

  it('Should redirect to /not-found when getOffer action rejected', async () => {
    const fakeInvalidId = 'test-id';
    const getOfferUrl = `${APIRoute.Hotels}/${fakeInvalidId}`;

    fakeHistory.push(getOfferUrl);

    mockAPI
      .onGet(getOfferUrl)
      .reply(404, []);

    const store = mockStore();

    await store.dispatch(getOfferAction(fakeInvalidId));
    expect(fakeHistory.location.pathname).toBe(AppRoute.NotFound);
  });
});
