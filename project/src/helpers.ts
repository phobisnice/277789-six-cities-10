import {RATING_STAR_PERCENT, CITIES, SORT_TYPES} from './const';
import {Offers} from './types/offer';

export function getPercentFromRating(rating: number): string {
  return rating ? `${(Math.round(rating) * RATING_STAR_PERCENT).toString()}%` : '0%';
}

export function getCityByName(name: string): typeof CITIES[number] {
  return CITIES.filter((city) => city.name === name)[0];
}

export function sortPlacesByType(places: Offers, type: typeof SORT_TYPES[number]): Offers {
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
}
