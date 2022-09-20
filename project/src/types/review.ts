import {Host} from './user';

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: Host;
};

export type ReviewInfoSent = {
  hotelId: string;
  commentData: {
    comment: string,
    rating: string,
  },
}

export type Reviews = Review[];
