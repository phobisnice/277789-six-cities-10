import {offerData} from './offer-data';
import {OfferData} from '../../types/state';
import {getOfferAction, getCommentsAction, getNearOffersAction, sendCommentAction} from '../api-actions';
import {makeFakeOffer, makeFakeReview} from '../../utils/mocks';

describe('Test offer reducer', () => {
  let state: OfferData;
  const fakeOffer = makeFakeOffer();
  const fakeReview = makeFakeReview();

  beforeEach(() => {
    state = {
      offer: null,
      comments: [],
      nearOffers: [],
      isOfferLoading: false,
    };
  });

  it('Without additional parameters should return initial state', () => {
    expect(offerData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        offer: null,
        comments: [],
        nearOffers: [],
        isOfferLoading: false,
      });
  });

  describe('Test getOfferAction', () => {
    it('Should update loading status to true when getOfferAction pending', () => {
      expect(offerData.reducer(state, {type: getOfferAction.pending.type}))
        .toEqual({
          offer: null,
          comments: [],
          nearOffers: [],
          isOfferLoading: true,
        });
    });

    it('Should update loading status to false and load offer data when getOfferAction fulfilled', () => {
      expect(offerData.reducer(state, {type: getOfferAction.fulfilled.type, payload: fakeOffer}))
        .toEqual({
          offer: fakeOffer,
          comments: [],
          nearOffers: [],
          isOfferLoading: false,
        });
    });

    it('Should update loading status to false when getOfferAction rejected', () => {
      expect(offerData.reducer(state, {type: getOfferAction.rejected.type}))
        .toEqual({
          offer: null,
          comments: [],
          nearOffers: [],
          isOfferLoading: false,
        });
    });
  });

  describe('Test getCommentsAction', () => {
    it('Should load comments when getCommentsAction fulfilled', () => {
      expect(offerData.reducer(state, {type: getCommentsAction.fulfilled.type, payload: [fakeReview]}))
        .toEqual({
          offer: null,
          comments: [fakeReview],
          nearOffers: [],
          isOfferLoading: false,
        });
    });
  });

  describe('Test getNearOffersAction', () => {
    it('Should load near offers when getNearOffersAction fulfilled', () => {
      expect(offerData.reducer(state, {type: getNearOffersAction.fulfilled.type, payload: [fakeOffer]}))
        .toEqual({
          offer: null,
          comments: [],
          nearOffers: [fakeOffer],
          isOfferLoading: false,
        });
    });
  });

  describe('Test sendCommentAction', () => {
    it('Should update comments when sendCommentAction fulfilled', () => {
      expect(offerData.reducer(state, {type: sendCommentAction.fulfilled.type, payload: [fakeReview]}))
        .toEqual({
          offer: null,
          comments: [fakeReview],
          nearOffers: [],
          isOfferLoading: false,
        });
    });

    it('Should not update comments when sendCommentAction rejected', () => {
      state = {
        offer: null,
        comments: [fakeReview],
        nearOffers: [],
        isOfferLoading: false,
      };

      expect(offerData.reducer(state, {type: sendCommentAction.rejected.type}))
        .toEqual({
          offer: null,
          comments: [fakeReview],
          nearOffers: [],
          isOfferLoading: false,
        });
    });
  });
});
