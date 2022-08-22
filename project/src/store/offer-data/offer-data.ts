import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OfferData} from '../../types/state';
import {getOfferAction, getCommentsAction, getNearOffersAction, sendCommentAction} from '../api-actions';

const initialState: OfferData = {
  offer: null,
  comments: [],
  nearOffers: [],
  isOfferLoading: false,
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOfferAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(getOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(getOfferAction.rejected, (state, action) => {
        state.isOfferLoading = false;
      })
      .addCase(getCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(getNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});
