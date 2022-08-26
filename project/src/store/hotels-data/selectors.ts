import {NameSpace, SORT_TYPES} from '../../const';
import {State} from '../../types/state';
import {City, Offers} from '../../types/offer';
import {createSelector} from 'reselect';
import {sortPlacesByType} from '../../helpers';

export const getDataLoadingStatus = (state: State): boolean => state[NameSpace.Hotels].isDataLoading;
export const getCity = (state: State): City => state[NameSpace.Hotels].city;
export const getPlaces = (state: State): Offers => state[NameSpace.Hotels].places;
export const getSortType = (state: State): typeof SORT_TYPES[number] => state[NameSpace.Hotels].sortType;
export const getActivePlaceId = (state: State): number => state[NameSpace.Hotels].activePlaceId;

export const getPlacesByCity = createSelector(
  getPlaces,
  getCity,
  getSortType,
  (offers: Offers, city: City, sort: typeof SORT_TYPES[number]): Offers => {
    const filteredByCityPlaces = offers.filter((place) => place.city.name === city.name);
    return sortPlacesByType(filteredByCityPlaces, sort);
  }
);
