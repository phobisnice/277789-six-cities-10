import {RATING_STAR_PERCENT} from './const';

export function getPercentFromRating(rating: number): string {
  return rating ? `${(Math.round(rating) * RATING_STAR_PERCENT).toString()}%` : '0%';
}
