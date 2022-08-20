import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer, Offers} from '../../types/offer';
import {Reviews} from '../../types/review';

export const getOffer = (state: State): Offer | null => state[NameSpace.Offer].offer;
export const getNearOffers = (state: State): Offers => state[NameSpace.Offer].nearOffers;
export const getComments = (state: State): Reviews => state[NameSpace.Offer].comments;
export const getOfferLoadingStatus = (state: State): boolean => state[NameSpace.Offer].isOfferLoading;
