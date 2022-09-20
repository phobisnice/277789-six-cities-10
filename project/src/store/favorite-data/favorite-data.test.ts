import {favoriteData} from './favorite-data';
import {FavoriteData} from '../../types/state';
import {getWishlistItemsAction, addToWishlistAction, removeFromWishlistAction} from '../api-actions';
import {makeFakeOffer} from '../../utils/mocks';

describe('Test favorite reducer', () => {
  let state: FavoriteData;
  const fakeFavoriteOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];

  beforeEach(() => {
    state = {
      wishlist: [],
      isWishlistLoading: false,
    };
  });

  it('Without additional parameters should return initial state', () => {
    expect(favoriteData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        wishlist: [],
        isWishlistLoading: false,
      });
  });

  describe('Test getWishlistItemsAction', () => {
    it('Should update loading status to true when getWishlistItemsAction pending', () => {
      expect(favoriteData.reducer(state, {type: getWishlistItemsAction.pending.type}))
        .toEqual({
          wishlist: [],
          isWishlistLoading: true,
        });
    });

    it('Should update loading status to false and load offer data when getWishlistItemsAction fulfilled', () => {
      state = {
        wishlist: [],
        isWishlistLoading: true,
      };

      expect(favoriteData.reducer(state, {type: getWishlistItemsAction.fulfilled.type, payload: fakeFavoriteOffers}))
        .toEqual({
          wishlist: fakeFavoriteOffers,
          isWishlistLoading: false,
        });
    });

    it('Should update loading status to false when getWishlistItemsAction rejected', () => {
      state = {
        wishlist: [],
        isWishlistLoading: true,
      };

      expect(favoriteData.reducer(state, {type: getWishlistItemsAction.rejected.type}))
        .toEqual({
          wishlist: [],
          isWishlistLoading: false,
        });
    });
  });

  describe('Test addToWishlistAction', () => {
    it('Should add an item to wishlist if it is not there on addToWishlistAction fulfilled', () => {
      const newMockFavoriteOffer = makeFakeOffer();

      expect(favoriteData.reducer(state, {type: addToWishlistAction.fulfilled.type, payload: newMockFavoriteOffer}))
        .toEqual({
          wishlist: [newMockFavoriteOffer],
          isWishlistLoading: false,
        });
    });

    it('Should not add an item to wishlist if it is already there on addToWishlistAction fulfilled', () => {
      state = {
        wishlist: fakeFavoriteOffers,
        isWishlistLoading: false,
      };

      const firstItemInFavorite = fakeFavoriteOffers[0];

      expect(favoriteData.reducer(state, {type: addToWishlistAction.fulfilled.type, payload: firstItemInFavorite}))
        .toEqual({
          wishlist: fakeFavoriteOffers,
          isWishlistLoading: false,
        });
    });
  });

  describe('Test removeFromWishlistAction', () => {
    it('Should remove an item to wishlist if it is there on removeFromWishlistAction fulfilled', () => {
      state = {
        wishlist: fakeFavoriteOffers,
        isWishlistLoading: false,
      };

      const firstItemInFavorite = fakeFavoriteOffers[0];

      expect(favoriteData.reducer(state, {type: removeFromWishlistAction.fulfilled.type, payload: firstItemInFavorite}))
        .toEqual({
          wishlist: fakeFavoriteOffers.slice(1),
          isWishlistLoading: false,
        });
    });

    it('Should not remove an item to wishlist if it is not there on removeFromWishlistAction fulfilled', () => {
      const newMockOfferNotInWishlist = makeFakeOffer();

      state = {
        wishlist: fakeFavoriteOffers,
        isWishlistLoading: false,
      };

      expect(favoriteData.reducer(state, {type: removeFromWishlistAction.fulfilled.type, payload: newMockOfferNotInWishlist}))
        .toEqual({
          wishlist: fakeFavoriteOffers,
          isWishlistLoading: false,
        });
    });
  });
});
