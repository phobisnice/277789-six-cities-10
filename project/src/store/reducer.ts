import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeCurrentOffers, loadOffers, changeSortType, setActivePlace} from './action';
import {DEFAULT_CITY, SORT_TYPES, DEFAULT_SORT_TYPE} from '../const';
import {offers} from '../mocks/offers';
import {getCityByName, sortPlacesByType} from '../helpers';
import {City, Offers} from '../types/offer';

const defaultCity = getCityByName(DEFAULT_CITY);

type InitialState = {
  city: City;
  places: Offers;
  placesByCity: Offers;
  sortType: typeof SORT_TYPES[number];
  activePlaceId: number
}

const initialState: InitialState = {
  city: defaultCity,
  places: [],
  placesByCity: [],
  sortType: DEFAULT_SORT_TYPE,
  activePlaceId: 0
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state) => {
      state.places = offers;
      state.placesByCity = offers.filter((place) => place.city.name === state.city.name);
    })
    .addCase(changeCity, (state, action) => {
      const {city} = action.payload;
      state.city = getCityByName(city);
    })
    .addCase(changeCurrentOffers, (state) => {
      const filteredByCityPlaces = state.places.filter((place) => place.city.name === state.city.name);
      state.placesByCity = sortPlacesByType(filteredByCityPlaces, state.sortType);
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload.sortType;
    })
    .addCase(setActivePlace, (state, action) => {
      state.activePlaceId = action.payload.activePlaceId;
    });
});

export {reducer};
