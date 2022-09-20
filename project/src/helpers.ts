import {AuthorizationStatus, CITIES, RATING, SORT_TYPES, ValidateError} from './const';
import {Offers} from './types/offer';
import {toast} from 'react-toastify';

export const getPercentFromRating = (rating?: number): string => {
  if (!rating || rating < 0) {
    return '0%';
  }

  const ratingNumber = rating > RATING.MaxValue ? RATING.MaxValue : rating;
  return `${(Math.round(ratingNumber) * RATING.StarPercent).toString()}%`;
};

export const getCityByName = (name: string): typeof CITIES[number] => CITIES.filter((city) => city.name === name)[0];

export const sortPlacesByType = (places: Offers, type: typeof SORT_TYPES[number]): Offers => {
  let sortedPlaces: Offers = places.slice();

  switch (type) {
    case 'Price: high to low':
      sortedPlaces = sortedPlaces.sort((firstPlace, nextPlace) => nextPlace.price - firstPlace.price);
      break;
    case 'Price: low to high':
      sortedPlaces = sortedPlaces.sort((firstPlace, nextPlace) => firstPlace.price - nextPlace.price);
      break;
    case 'Top rated first':
      sortedPlaces = sortedPlaces.sort((firstPlace, nextPlace) => nextPlace.rating - firstPlace.rating);
      break;
  }

  return sortedPlaces;
};

export const checkValueByRegexp = (value: string, regexp: RegExp, messageError: ValidateError): boolean => {
  const isValid = regexp.test(value);

  if (!isValid) {
    toast.warn(messageError);
  }

  return isValid;
};

export const checkLoadingAuthStatus = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Unknown;

export const checkAuthStatus = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Auth;

export const getRandomValueFromArray = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
