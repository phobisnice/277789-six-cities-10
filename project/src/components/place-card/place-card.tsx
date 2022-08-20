import {MouseEvent} from 'react';
import {Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
import {WishlistType} from '../../const';
import {getPercentFromRating} from '../../helpers';
import WishlistButton from '../wishlist-button/wishlist-button';

type PlaceCardsProps = {
  info: Offer;
  kind: 'favorites' | 'near-places' | 'cities';
  onHoverHandle: (id: number) => void;
  imageSizes: {
    width: string;
    height: string;
  }
}

function PlaceCard({info, kind, imageSizes, onHoverHandle}: PlaceCardsProps): JSX.Element {
  const ratingInPercent = getPercentFromRating(info.rating);

  const placeCardHoverHandle = (id: number) => (evt: MouseEvent) => {
    onHoverHandle(id);
  };

  return (
    <article
      className={`${kind}__card place-card`}
      onMouseEnter={placeCardHoverHandle(info.id)}
      onMouseLeave={placeCardHoverHandle(0)}
    >
      {
        info.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }
      <div className={`${kind}__image-wrapper place-card__image-wrapper`}>
        <Link
          to={`/offer/${info.id}`}
        >
          <img
            className="place-card__image"
            src={info.previewImage}
            width={imageSizes.width}
            height={imageSizes.height}
            alt={info.title}
          />
        </Link>
      </div>
      <div className={`${kind}____card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{info.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <WishlistButton isFavorite={info.isFavorite} type={WishlistType.List} offerId={info.id} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingInPercent}`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={`/offer/${info.id}`}
          >
            {info.title}
          </Link>
        </h2>
        <p className="place-card__type">{info.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
