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
  ActiveImage = '/img/pin-acitve.svg',
}

export const DEFAULT_CITY = {
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 9,
  },
  name: 'Amsterdam',
};

export const MAP_PIN_SIZE = {
  iconSize: [27, 39],
  iconAnchor: [13, 39],
};

export const RATING_STAR_PERCENT = 20;

export const NEAR_PLACE_SETTINGS = {
  CARDS_TO_SHOW: 3,
  KIND: 'near-places',
} as const;
