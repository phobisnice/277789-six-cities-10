import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {reducer} from '../reducer';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'data/redirectToRoute') {
          browserHistory.push(action.paylod);
        }

        return next(action);
      };
