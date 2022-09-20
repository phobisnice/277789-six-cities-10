import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FavoriteData} from '../../types/state';
import {addToWishlistAction, removeFromWishlistAction, getWishlistItemsAction} from '../api-actions';

const initialState: FavoriteData = {
  wishlist: [],
  isWishlistLoading: false,
};

export const favoriteData = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getWishlistItemsAction.pending, (state, action) => {
        state.isWishlistLoading = true;
      })
      .addCase(getWishlistItemsAction.fulfilled, (state, action) => {
        state.isWishlistLoading = false;
        state.wishlist = action.payload;
      })
      .addCase(getWishlistItemsAction.rejected, (state, action) => {
        state.isWishlistLoading = false;
      })
      .addCase(addToWishlistAction.fulfilled, (state, action) => {
        const isItemInWishlist = state.wishlist.filter((item) => item.id === action.payload.id).length;
        if (!isItemInWishlist) {
          state.wishlist.push(action.payload);
        }
      })
      .addCase(removeFromWishlistAction.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id);
      });
  }
});
