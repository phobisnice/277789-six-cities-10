import {AuthorizationStatus, NameSpace} from '../../const';
import {State} from '../../types/state';
import {User} from '../../types/user';

export const getUser = (state: State): User | null => state[NameSpace.User].user;
export const getUserAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
