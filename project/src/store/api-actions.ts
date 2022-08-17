import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Offers} from '../types/offer';
import {User} from '../types/user';
import {Auth} from '../types/auth';
import {AppDispatch, State} from '../types/state';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {
  getOffer, loadComments, loadNearOffers,
  loadOffers,
  redirectToRoute,
  setAuthorizationStatus,
  setDataLoadingStatus,
  setUserInfo
} from './action';
import {dropToken, saveToken} from '../services/token';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
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

export const getOfferAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/getOffer',
  async (hotelId, {dispatch, extra: api, rejectWithValue}) => {
    try {
      const offerRoute = `${APIRoute.Hotels}/${hotelId}`;
      const {data: offer} = await api.get(offerRoute);

      dispatch(setDataLoadingStatus(true));
      dispatch(getOffer(offer));
      dispatch(setDataLoadingStatus(false));
    } catch {
      return rejectWithValue(null);
    }
  }
);

export const getCommentsAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/getOffer',
  async (hotelId, {dispatch, extra: api}) => {
    const commentsRoute = `${APIRoute.Comments}/${hotelId}`;
    const {data: comments} = await api.get(commentsRoute);

    dispatch(setDataLoadingStatus(true));
    dispatch(loadComments(comments));
    dispatch(setDataLoadingStatus(false));
  }
);

export const getNearOffersAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/getNearOffers',
  async (hotelId, {dispatch, extra: api}) => {
    const nearOffersRoute = `${APIRoute.Hotels}/${hotelId}/nearby`;
    const {data: nearOffers} = await api.get(nearOffersRoute);
    dispatch(loadNearOffers(nearOffers));
  }
);

export const getWishlistItems = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/getWishlistItems',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: wishlist} = await api.get(APIRoute.Favorite);
      dispatch(loadNearOffers(wishlist));
    } catch {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  }
);
