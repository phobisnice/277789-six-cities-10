import {userData} from './user-data';
import {UserData} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import {makeFakeUser} from '../../utils/mocks';

describe('Test user reducer', () => {
  let state: UserData;
  const fakeUser = makeFakeUser();

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };
  });

  it('Without additional parameters should return initial state', () => {
    expect(userData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      });
  });

  describe('Test checkAuthAction', () => {
    it('Should update authorizationStatus to "AUTH" and load User info if checkAuthAction fulfilled', () => {
      expect(userData.reducer(state, { type: checkAuthAction.fulfilled.type, payload: fakeUser }))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, user: fakeUser});
    });

    it('Should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userData.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, user: null});
    });
  });

  describe('Test loginAction', () => {
    it('Should update authorizationStatus to "AUTH" and load User info if loginAction fulfilled', () => {
      expect(userData.reducer(state, { type: loginAction.fulfilled.type, payload: fakeUser }))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, user: fakeUser});
    });

    it('Should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userData.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, user: null});
    });
  });

  describe('Test logoutAction', () => {
    it('Should update authorizationStatus to "NO_AUTH" and clear user info if logoutAction fulfilled', () => {
      state = {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUser,
      };

      expect(userData.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, user: null});
    });
  });
});
