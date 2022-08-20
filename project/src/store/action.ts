import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const';
import {Reviews} from '../types/review';

export const redirectToRoute = createAction<AppRoute>('data/redirectToRoute');

export const loadComments = createAction<Reviews>('data/loadComments');

