import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Offers} from '../types/offer';
import {AppDispatch, State} from '../types/state';
import {APIRoute} from '../const';
import {loadOffers, setDataLoadingStatus} from './action';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.Hotels);
    dispatch(loadOffers(data));
    dispatch(setDataLoadingStatus(false));
  }
);
