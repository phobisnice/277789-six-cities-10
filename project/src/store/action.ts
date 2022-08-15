import {createAction} from '@reduxjs/toolkit';
import {CITIES, SORT_TYPES, AuthorizationStatus, AppRoute} from '../const';
import {Offers} from '../types/offer';
import {User} from '../types/user';

export const changeCity = createAction<typeof CITIES[number]['name']>('offers/changeCity');

export const changeCurrentOffers = createAction('offers/changeOffers');

export const changeSortType = createAction<typeof SORT_TYPES[number]>('offers/changeSortType');

export const setActivePlace = createAction<number>('offers/setActivePlace');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

export const redirectToRoute = createAction<AppRoute>('data/redirectToRoute');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');

export const setUserInfo = createAction<User | null>('user/setUserInfo');
