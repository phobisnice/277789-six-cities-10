import {store} from '../store';
import {User} from './user';
import {AuthorizationStatus, SORT_TYPES} from '../const';
import {City, Offer, Offers} from './offer';
import {Reviews} from './review';

export type UserData = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

export type OfferData = {
  offer: Offer | null;
  comments: Reviews;
  nearOffers: Offers;
  isOfferLoading: boolean;
};

export type FavoriteData = {
  wishlist: Offers;
  isWishlistLoading: boolean;
}

export type HotelsData = {
  city: City;
  places: Offers;
  sortType: typeof SORT_TYPES[number];
  activePlaceId: number;
  isDataLoading: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
