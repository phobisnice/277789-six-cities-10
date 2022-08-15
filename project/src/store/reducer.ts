import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity,
  changeCurrentOffers,
  changeSortType,
  loadOffers,
  setActivePlace, setAuthorizationStatus,
  setDataLoadingStatus, setUserInfo
} from './action';
import {AuthorizationStatus, DEFAULT_CITY, DEFAULT_SORT_TYPE, SORT_TYPES} from '../const';
import {getCityByName, sortPlacesByType} from '../helpers';
import {City, Offers} from '../types/offer';
import {User} from '../types/user';

const defaultCity = getCityByName(DEFAULT_CITY);

type InitialState = {
  city: City;
  places: Offers;
  placesByCity: Offers;
  sortType: typeof SORT_TYPES[number];
  activePlaceId: number;
  isDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
  wishlist: Offers
}

const initialState: InitialState = {
  city: defaultCity,
  places: [],
  placesByCity: [],
  sortType: DEFAULT_SORT_TYPE,
  activePlaceId: 0,
  isDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  wishlist: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.places = action.payload;
      state.placesByCity = action.payload.filter((place) => place.city.name === state.city.name);
    })
    .addCase(changeCity, (state, action) => {
      const city = action.payload;
      state.city = getCityByName(city);
    })
    .addCase(changeCurrentOffers, (state) => {
      const filteredByCityPlaces = state.places.filter((place) => place.city.name === state.city.name);
      state.placesByCity = sortPlacesByType(filteredByCityPlaces, state.sortType);
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(setActivePlace, (state, action) => {
      state.activePlaceId = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.user = action.payload;
    });
});

export {reducer};
