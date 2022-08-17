import {Host} from './user';

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: Host;
};

export type Reviews = Review[];
