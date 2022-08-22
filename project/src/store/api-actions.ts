import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Offer, Offers} from '../types/offer';
import {User} from '../types/user';
import {Auth} from '../types/auth';
import {AppDispatch, State} from '../types/state';
import {Reviews, ReviewInfoSent} from '../types/review';
import {APIRoute, AppRoute, WishlistStatus} from '../const';
import {
  redirectToRoute,
} from './action';
import {dropToken, saveToken} from '../services/token';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'hotels/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Hotels);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<User, Auth, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: user} = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(user.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return user;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const getOfferAction = createAsyncThunk<Offer, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offer/getOffer',
  async (hotelId, {extra: api, rejectWithValue}) => {
    try {
      const offerRoute = `${APIRoute.Hotels}/${hotelId}`;
      const {data} = await api.get(offerRoute);
      return data;
    } catch {
      return rejectWithValue(null);
    }
  }
);

export const getCommentsAction = createAsyncThunk<Reviews, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offer/getComments',
  async (hotelId, {extra: api}) => {
    const commentsRoute = `${APIRoute.Comments}/${hotelId}`;
    const {data} = await api.get(commentsRoute);

    return data;
  }
);

export const sendCommentAction = createAsyncThunk<Reviews, ReviewInfoSent, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offer/sendComments',
  async (commentInfo, {extra: api, rejectWithValue}) => {
    const {hotelId, commentData, callbacks} = commentInfo;
    const commentsRoute = `${APIRoute.Comments}/${hotelId}`;
    try {
      const {data} = await api.post(commentsRoute, commentData);
      callbacks?.successCallback();
      return data;
    } catch {
      callbacks?.errorCallback();
      return rejectWithValue([]);
    }
  }
);

export const getNearOffersAction = createAsyncThunk<Offers, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offer/getNearOffers',
  async (hotelId, {dispatch, extra: api}) => {
    const nearOffersRoute = `${APIRoute.Hotels}/${hotelId}/nearby`;
    const {data} = await api.get(nearOffersRoute);

    return data;
  }
);

export const getWishlistItemsAction = createAsyncThunk<Offers, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'favorite/getWishlistItems',
  async (_arg, {extra: api}) => {
    const {data} = await api.get(APIRoute.Favorite);

    return data;
  }
);

export const addToWishlistAction = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'favorite/addToWishlist',
  async (hotelId, {extra: api}) => {
    const addAction = `${APIRoute.Favorite}/${hotelId}/${WishlistStatus.Add}`;
    const {data} = await api.post(addAction);

    return data;
  }
);

export const removeFromWishlistAction = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'favorite/removeFromWishlist',
  async (hotelId, {extra: api}) => {
    const addAction = `${APIRoute.Favorite}/${hotelId}/${WishlistStatus.Remove}`;
    const {data} = await api.post(addAction);

    return data;
  }
);
