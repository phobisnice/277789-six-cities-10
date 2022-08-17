import {Host} from './user';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  location: Location;
  name: string;
};

export type OfferKind = 'apartment' | 'room' | 'house' | 'hotel';

export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: Host;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: OfferKind;
};

export type Offers = Offer[];

export type OffersByCity = {
  name: 'string';
  offers: Offers
}
