import {createApi} from '../services/api';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {
  fetchOffersAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  getOfferAction,
  getCommentsAction,
  sendCommentAction,
  getNearOffersAction,
  getWishlistItemsAction,
  addToWishlistAction,
  removeFromWishlistAction
} from './api-actions';
import {APIRoute, AppRoute} from '../const';
import {State} from '../types/state';
import {Auth} from '../types/auth';
import {redirectToRoute} from './action';
import {makeFakeOffer, makeFakeUser, makeFakeReview} from '../utils/mocks';
import {redirect} from './middlewares/redirect';
import {ReviewInfoSent} from '../types/review';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../browser-history', () => fakeHistory);


describe('Test async actions', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  const api = createApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api), redirect];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('Should dispatch fetch offers on GET /hotels', async () => {
    const mockOffers = [makeFakeOffer()];
    mockAPI
      .onGet(APIRoute.Hotels)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('Should authorization status is auth when server return 200 on GET /login', async () => {
    const fakeUser = makeFakeUser();

    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, fakeUser);

    const store = mockStore();

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('Should authorization status is noAuth when server return 401 on GET /login', async () => {
    const fakeError = {
      error: 'You are not logged in or you do not have permission to this page.'
    };

    mockAPI
      .onGet(APIRoute.Login)
      .reply(401, fakeError);

    const store = mockStore();

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.rejected.type
    ]);
  });

  it('Should authorize, dispatch redirectToRoute and set token in Storage when server return 200 on POST /login', async () => {
    const fakeAuthData: Auth = {
      email: 'test@test.com',
      password: 'strong123456'
    };

    const fakeUserResponse = makeFakeUser(fakeAuthData.email, 'secret-token');

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, fakeUserResponse);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeAuthData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret-token');
  });

  it('Should dispatch logout when server 204 on DELETE /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });

  it('Should dispatch get offer if it exist on GET /hotels/{id}', async () => {
    const fakeOffer = makeFakeOffer();
    const {id: fakeOfferId} = fakeOffer;
    const getOfferUrl = `${APIRoute.Hotels}/${fakeOfferId}`;

    mockAPI
      .onGet(getOfferUrl)
      .reply(200, fakeOffer);

    const store = mockStore();

    await store.dispatch(getOfferAction(String(fakeOfferId)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      getOfferAction.pending.type,
      getOfferAction.fulfilled.type
    ]);
  });

  it('Should rejected and dispatch redirectToRoute to not found page if offer doesnt exist on GET /hotels/{id}', async () => {
    const fakeInvalidId = 'test-id';
    const getOfferUrl = `${APIRoute.Hotels}/${fakeInvalidId}`;

    fakeHistory.push(getOfferUrl);

    mockAPI
      .onGet(getOfferUrl)
      .reply(404, []);

    const store = mockStore();

    await store.dispatch(getOfferAction(fakeInvalidId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      getOfferAction.pending.type,
      getOfferAction.rejected.type
    ]);

    expect(fakeHistory.location.pathname).toBe(AppRoute.NotFound);
  });

  it('Should dispatch get comments on GET /comments/{id}', async () => {
    const fakeOfferId = '13';
    const fakeComments = [makeFakeReview()];
    const getCommentsUrl = `${APIRoute.Comments}/${fakeOfferId}`;

    mockAPI
      .onGet(getCommentsUrl)
      .reply(200, fakeComments);

    const store = mockStore();

    await store.dispatch(getCommentsAction(fakeOfferId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      getCommentsAction.pending.type,
      getCommentsAction.fulfilled.type
    ]);
  });

  it('Should dispatch send review when server 200 on POST /comments/{id}', async () => {
    const fakeOfferId = '13';
    const fakeComment = makeFakeReview();
    const {comment, rating} = fakeComment;
    const fakeCommentData: ReviewInfoSent = {
      hotelId: fakeOfferId,
      commentData: {
        comment,
        rating: String(rating)
      }
    };
    const postCommentUrl = `${APIRoute.Comments}/${fakeOfferId}`;

    mockAPI
      .onPost(postCommentUrl)
      .reply(200, fakeComment);

    const store = mockStore();

    await store.dispatch(sendCommentAction(fakeCommentData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendCommentAction.pending.type,
      sendCommentAction.fulfilled.type
    ]);
  });

  it('Should rejected on send review when server error on POST /comments/{id}', async () => {
    const fakeOfferId = '13';
    const {comment, rating, id} = makeFakeReview();
    const fakeCommentData: ReviewInfoSent = {
      hotelId: fakeOfferId,
      commentData: {
        comment,
        rating: String(rating)
      }
    };
    const postCommentUrl = `${APIRoute.Comments}/${fakeOfferId}`;
    const fakeError = {
      error: `Hotel id ${id} does not exist`
    };

    mockAPI
      .onPost(postCommentUrl)
      .reply(400, fakeError);

    const store = mockStore();

    await store.dispatch(sendCommentAction(fakeCommentData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendCommentAction.pending.type,
      sendCommentAction.rejected.type
    ]);
  });

  it('Should dispatch get near offers on GET /hotels/{id}/nearby', async () => {
    const fakeOfferId = '13';
    const fakeOffers = [makeFakeOffer()];
    const getNearOffersUrl = `${APIRoute.Hotels}/${fakeOfferId}/nearby`;

    mockAPI
      .onGet(getNearOffersUrl)
      .reply(200, fakeOffers);

    const store = mockStore();

    await store.dispatch(getNearOffersAction(fakeOfferId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      getNearOffersAction.pending.type,
      getNearOffersAction.fulfilled.type
    ]);
  });

  it('Should dispatch get reviews on GET /favorite', async () => {
    const fakeOffers = [makeFakeOffer()];

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, fakeOffers);

    const store = mockStore();

    await store.dispatch(getWishlistItemsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      getWishlistItemsAction.pending.type,
      getWishlistItemsAction.fulfilled.type
    ]);
  });

  it('Should rejected when server 401 on GET /favorite', async () => {
    const fakeError = {
      error: 'You are not logged in or you do not have permission to this page.'
    };

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(401, fakeError);

    const store = mockStore();

    await store.dispatch(getWishlistItemsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      getWishlistItemsAction.pending.type,
      getWishlistItemsAction.rejected.type
    ]);
  });

  it('Should dispatch add to wishlist on POST /favorite/{id}/1', async () => {
    const fakeOffer = makeFakeOffer();
    const {id: fakeOfferId} = fakeOffer;
    const addToWishlistUrl = `${APIRoute.Favorite}/${fakeOfferId}/1`;

    mockAPI
      .onPost(addToWishlistUrl)
      .reply(200, fakeOffer);

    const store = mockStore();

    await store.dispatch(addToWishlistAction(fakeOfferId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addToWishlistAction.pending.type,
      addToWishlistAction.fulfilled.type
    ]);
  });

  it('Should dispatch remove from wishlist on POST /favorite/{id}/0', async () => {
    const fakeOffer = makeFakeOffer();
    const {id: fakeOfferId} = fakeOffer;
    const removeToWishlistUrl = `${APIRoute.Favorite}/${fakeOfferId}/0`;

    mockAPI
      .onPost(removeToWishlistUrl)
      .reply(200, fakeOffer);

    const store = mockStore();

    await store.dispatch(removeFromWishlistAction(fakeOfferId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      removeFromWishlistAction.pending.type,
      removeFromWishlistAction.fulfilled.type
    ]);
  });
});
