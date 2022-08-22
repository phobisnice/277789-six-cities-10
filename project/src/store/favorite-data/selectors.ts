import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offers} from '../../types/offer';

export const getWishlistLoadingStatus = (state: State): boolean => state[NameSpace.Favorite].isWishlistLoading;
export const getWishlist = (state: State): Offers => state[NameSpace.Favorite].wishlist;
