import {Token} from '../services/token';

export type Host = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};


export type User = Host & {
  token: Token;
  email: string;
};
