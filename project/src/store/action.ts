import {createAction} from '@reduxjs/toolkit';
import {CITIES, SORT_TYPES, AuthorizationStatus, AppRoute} from '../const';
import {Offer, Offers} from '../types/offer';
import {User} from '../types/user';
import {Reviews} from '../types/review';

export const changeCity = createAction<typeof CITIES[number]['name']>('offers/changeCity');

export const changeCurrentOffers = createAction('offers/changeOffers');

export const changeSortType = createAction<typeof SORT_TYPES[number]>('offers/changeSortType');

export const setActivePlace = createAction<number>('offers/setActivePlace');

export const loadWishlistItems = createAction<Offers>('data/loadWishlistItems');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const loadComments = createAction<Reviews>('data/loadComments');

export const loadNearOffers = createAction<Offers>('data/loadNearOffers');

export const getOffer = createAction<Offer>('data/getOffer');

export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

export const redirectToRoute = createAction<AppRoute>('data/redirectToRoute');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');

export const setUserInfo = createAction<User | null>('user/setUserInfo');
