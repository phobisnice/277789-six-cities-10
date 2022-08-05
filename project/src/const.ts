export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum OfferKind {
  Apartment = 'Apartment',
  Room = 'Private Room',
  House = 'House',
  Hotel = 'Hotel',
}

export enum PreviewSize {
  NormalItemWidth = '260',
  NormalItemHeight = '200',
  FavoriteItemWidth = '150',
  FavoriteItemHeight = '110',
}

export enum MapPin {
  InactiveImage = '/img/pin.svg',
  ActiveImage = '/img/pin-active.svg',
}

export const DEFAULT_CITY = 'Paris';

export const MAP_PIN_SIZE = {
  iconSize: [27, 39],
  iconAnchor: [13, 39],
};

export const RATING_STAR_PERCENT = 20;

export const NEAR_PLACE_SETTINGS = {
  CARDS_TO_SHOW: 3,
  KIND: 'near-places',
} as const;

export const CITIES = [
  {
    location: {
      latitude: 48.857116,
      longitude: 2.355333,
      zoom: 9,
    },
    name: 'Paris',
  },
  {
    location: {
      latitude: 50.930779,
      longitude: 6.938399,
      zoom: 9,
    },
    name: 'Cologne',
  },
  {
    location: {
      latitude: 50.854283,
      longitude: 4.352131,
      zoom: 9,
    },
    name: 'Brussels',
  },
  {
    location: {
      latitude: 52.373057,
      longitude: 4.892557,
      zoom: 9,
    },
    name: 'Amsterdam',
  },
  {
    location: {
      latitude: 53.550688,
      longitude: 9.992895,
      zoom: 9,
    },
    name: 'Hamburg',
  },
  {
    location: {
      latitude: 51.230569,
      longitude: 6.787428,
      zoom: 9,
    },
    name: 'Dusseldorf',
  },
] as const;

export const SORT_TYPES = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] as const;

export const DEFAULT_SORT_TYPE = 'Popular';
