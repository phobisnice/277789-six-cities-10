import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {HotelsData} from '../../types/state';
import {fetchOffersAction} from '../api-actions';
import {DEFAULT_CITY, DEFAULT_SORT_TYPE} from '../../const';
import {getCityByName} from '../../helpers';

const defaultCity = getCityByName(DEFAULT_CITY);

const initialState: HotelsData = {
  city: defaultCity,
  places: [],
  sortType: DEFAULT_SORT_TYPE,
  activePlaceId: 0,
  isDataLoading: false,
};

export const hotelsData = createSlice({
  name: NameSpace.Hotels,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      const newCity = getCityByName(action.payload);
      if (newCity) {
        state.city = newCity;
      }
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setActivePlace: (state, action) => {
      state.activePlaceId = action.payload;
    },
    updatePlaceWishlistStatus: (state, action) => {
      const {id, status} = action.payload;
      const [place] = state.places.filter((item) => item.id === id);

      if (place) {
        place.isFavorite = Boolean(status);
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state, action) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.places = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.isDataLoading = false;
      });
  }
});

export const {changeCity, changeSortType, setActivePlace, updatePlaceWishlistStatus} = hotelsData.actions;
