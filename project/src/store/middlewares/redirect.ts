import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {rootReducer} from '../root-reducer';
import {isRejectedWithValue} from '@reduxjs/toolkit';
import {AppRoute} from '../../const';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'data/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        if (action.type === 'offer/getOffer/rejected' && isRejectedWithValue(action)) {
          browserHistory.push(AppRoute.NotFound);
        }

        return next(action);
      };
