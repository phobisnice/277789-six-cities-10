import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {hotelsData} from './hotels-data/hotels-data';
import {offerData} from './offer-data/offer-data';
import {favoriteData} from './favorite-data/favorite-data';
import {userData} from './user-data/user-data';

export const rootReducer = combineReducers({
  [NameSpace.Hotels]: hotelsData.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.User]: userData.reducer,
  [NameSpace.Favorite]: favoriteData.reducer
});
