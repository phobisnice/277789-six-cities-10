import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {HotelsData} from '../../types/state';
import {fetchOffersAction} from '../api-actions';
import {DEFAULT_CITY, DEFAULT_SORT_TYPE} from '../../const';
import {getCityByName, sortPlacesByType} from '../../helpers';

const defaultCity = getCityByName(DEFAULT_CITY);

const initialState: HotelsData = {
  city: defaultCity,
  places: [],
  placesByCity: [],
  sortType: DEFAULT_SORT_TYPE,
  activePlaceId: 0,
  isDataLoading: false,
};

export const hotelsData = createSlice({
  name: NameSpace.Hotels,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = getCityByName(action.payload);
    },
    changeCurrentOffers: (state) => {
      const filteredByCityPlaces = state.places.filter((place) => place.city.name === state.city.name);
      state.placesByCity = sortPlacesByType(filteredByCityPlaces, state.sortType);
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setActivePlace: (state, action) => {
      state.activePlaceId = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state, action) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.places = action.payload;
        state.placesByCity = action.payload.filter((place) => place.city.name === state.city.name);
        state.isDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.isDataLoading = false;
      });
  }
});

export const {changeCity, changeCurrentOffers, changeSortType, setActivePlace} = hotelsData.actions;
