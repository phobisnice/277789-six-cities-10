import {createAction} from '@reduxjs/toolkit';
import {CITIES, SORT_TYPES} from '../const';

export const changeCity = createAction<{city: typeof CITIES[number]['name']}>('changeCity');

export const loadOffers = createAction('loadOffers');

export const changeCurrentOffers = createAction('changeOffers');

export const changeSortType = createAction<{sortType: typeof SORT_TYPES[number]}>('changeSortType');

export const setActivePlace = createAction<{activePlaceId: number}>('setActivePlace');
