import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Offers} from '../types/offer';
import {User} from '../types/user';
import {Auth} from '../types/auth';
import {AppDispatch, State} from '../types/state';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {loadOffers, redirectToRoute, setAuthorizationStatus, setDataLoadingStatus, setUserInfo} from './action';
import {dropToken, saveToken} from '../services/token';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Hotels);
    dispatch(setDataLoadingStatus(true));
    dispatch(loadOffers(data));
    dispatch(setDataLoadingStatus(false));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: user} = await api.get(APIRoute.Login);
      dispatch(setUserInfo(user));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, Auth, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: user} = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(user.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserInfo(user));
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUserInfo(null));
  }
);
