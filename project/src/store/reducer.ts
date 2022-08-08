import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity,
  changeCurrentOffers,
  loadOffers,
  changeSortType,
  setActivePlace,
  setDataLoadingStatus
} from './action';
import {DEFAULT_CITY, SORT_TYPES, DEFAULT_SORT_TYPE} from '../const';
import {getCityByName, sortPlacesByType} from '../helpers';
import {City, Offers} from '../types/offer';

const defaultCity = getCityByName(DEFAULT_CITY);

type InitialState = {
  city: City;
  places: Offers;
  placesByCity: Offers;
  sortType: typeof SORT_TYPES[number];
  activePlaceId: number;
  isDataLoading: boolean;
}

const initialState: InitialState = {
  city: defaultCity,
  places: [],
  placesByCity: [],
  sortType: DEFAULT_SORT_TYPE,
  activePlaceId: 0,
  isDataLoading: false,
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
    });
});

export {reducer};
