import {name, random, datatype, address, lorem, image, internet, date} from 'faker';
import {City, Location, Offer, OfferKind} from '../types/offer';
import {CITIES} from '../const';
import {Host, User} from '../types/user';
import {Review} from '../types/review';

export const makeFakeOfferType = (array: Array<OfferKind>): OfferKind => array[datatype.number(array.length)];

export const makeFakeLocation = (): Location => ({
  latitude: parseFloat(address.latitude(54, 48, 6)),
  longitude: parseFloat(address.longitude(10, 2, 6)),
  zoom: 9
});

export const makeFakeCity = (): City => ({
  location: makeFakeLocation(),
  name: CITIES.map((city) => city.name)[datatype.number(CITIES.length - 1)]
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

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number({min: 1, max: 9}),
  city: makeFakeCity(),
  description: lorem.sentence(),
  goods: new Array(datatype.number({min: 1, max: 10})).fill(random.word()),
  host: makeFakeHost(),
  id: datatype.number(10000),
  images: new Array(datatype.number({min: 1, max: 10})).fill(image.city()),
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
