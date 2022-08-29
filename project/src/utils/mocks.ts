import {address, datatype, date, image, internet, lorem, name, random} from 'faker';
import {City, Location, Offer, OfferKind, Offers} from '../types/offer';
import {AuthorizationStatus, CITIES, DEFAULT_CITY} from '../const';
import {Host, User} from '../types/user';
import {Review} from '../types/review';
import {State} from '../types/state';
import {getCityByName} from '../helpers';

export const makeFakeOfferType = (array: Array<OfferKind>): OfferKind => array[datatype.number(array.length)];

export const makeFakeLocation = (): Location => ({
  latitude: parseFloat(address.latitude(54, 48, 6)),
  longitude: parseFloat(address.longitude(10, 2, 6)),
  zoom: 9
});

export const makeFakeCity = (cityName?: typeof CITIES[number]['name']): City => ({
  location: makeFakeLocation(),
  name: cityName ?? CITIES.map((city) => city.name)[datatype.number(CITIES.length - 1)]
});

export const makeFakeHost = (): Host => ({
  avatarUrl: image.avatar(),
  id: datatype.number(10000),
  isPro: datatype.boolean(),
  name: name.findName()
});

export const makeFakeUser = (email?: string, token?: string): User => ({
  ...makeFakeHost(),
  token: token || 'secret',
  email: email || internet.email(),
});

export const makeFakeOffer = (cityName?: typeof CITIES[number]['name']): Offer => ({
  bedrooms: datatype.number({min: 1, max: 9}),
  city: cityName ? makeFakeCity(cityName) : makeFakeCity(),
  description: lorem.sentence(),
  goods: new Array(datatype.number({min: 1, max: 10}))
    .fill('')
    .map(() => random.word()),
  host: makeFakeHost(),
  id: datatype.number(10000),
  images: new Array(datatype.number({min: 1, max: 10}))
    .fill('')
    .map(() => image.imageUrl(260, 200, '', true)),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeFakeLocation(),
  maxAdults: datatype.number({min: 1, max: 9}),
  previewImage: image.city(),
  price: datatype.number({min: 10, max: 10000}),
  rating: datatype.number({min: 1, max: 5, precision: 0.1}),
  title: lorem.words(20),
  type: makeFakeOfferType(['apartment', 'room', 'house', 'hotel'])
});

export const makeFakeReview = (): Review => ({
  comment: lorem.sentence(datatype.number({min: 1, max: 3})),
  date: String(new Date(date.recent())),
  id: datatype.number(10000),
  rating: datatype.number({min: 1, max: 5}),
  user: makeFakeHost(),
});

const defaultCity = getCityByName(DEFAULT_CITY);

export const makeFakeStore = (user?: User, defaultPlaces?: Offers): State => ({
  'HOTELS': {
    city: defaultCity,
    places: defaultPlaces ?? [],
    sortType: 'Popular',
    activePlaceId: 0,
    isDataLoading: false,
  },
  'FAVORITE': {
    wishlist: [],
    isWishlistLoading: false,
  },
  'OFFER': {
    offer: null,
    comments: [],
    nearOffers: [],
    isOfferLoading: false,
  },
  'USER': {
    authorizationStatus: user ? AuthorizationStatus.Auth : AuthorizationStatus.Unknown,
    user: user ?? null,
  }
});
