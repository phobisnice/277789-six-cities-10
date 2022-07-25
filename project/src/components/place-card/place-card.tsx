import {Offer} from '../../types/offer';
import {Link} from 'react-router-dom';

type PlaceCardsProps = {
  info: Offer;
  kind: 'favorites' | 'near-places' | 'cities';
  isActive: boolean;
  onHoverHandle: (id: number) => void;
  imageSizes: {
    width: string;
    height: string;
  }
}

function PlaceCard({info, kind, imageSizes, isActive, onHoverHandle}: PlaceCardsProps): JSX.Element {
  const ratingInPercent = info.rating ? Math.round(info.rating) * 20 : 0;
  return (
    <article className={`${kind}__card place-card`} onMouseEnter={() => onHoverHandle(info.id)}>
      {
        info.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }
      <div className={`${kind}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${info.id}`}>
          <img className="place-card__image" src={info.previewImage} width={imageSizes.width} height={imageSizes.height}
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
          <button className={`place-card__bookmark-button button ${info.isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingInPercent.toString()}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${info.id}`}>{info.title}</Link>
        </h2>
        <p className="place-card__type">{info.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
