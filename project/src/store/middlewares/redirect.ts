import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {reducer} from '../reducer';
import {isRejectedWithValue} from '@reduxjs/toolkit';
import {AppRoute} from '../../const';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'data/redirectToRoute') {
          browserHistory.push(action.paylod);
        }

        if (action.type === 'data/getOffer/rejected' && isRejectedWithValue(action)) {
          browserHistory.push(AppRoute.NotFound);
        }

        return next(action);
      };
