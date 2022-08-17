import {Offer} from '../../types/offer';
import {getPercentFromRating} from '../../helpers';

type RoomDescriptionProps = {
  offer: Offer;
}

function RoomDescription({offer}: RoomDescriptionProps): JSX.Element {
  const ratingInPercent = getPercentFromRating(offer.rating);
  const bedroomsText = offer.bedrooms > 1 ? `${offer.bedrooms} Bedrooms` : `${offer.bedrooms} Bedroom`;

  return (
    <>
      {
        offer.isPremium &&
        <div className="property__mark">
          <span>Premium</span>
        </div>
      }
      <div className="property__name-wrapper">
        <h1 className="property__name">
          {offer.title}
        </h1>
        <button className="property__bookmark-button button" type="button">
          <svg className="property__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="property__rating rating">
        <div className="property__stars rating__stars">
          <span style={{width: `${ratingInPercent}`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="property__rating-value rating__value">{offer.rating}</span>
      </div>
      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          {offer.type}
        </li>
        <li className="property__feature property__feature--bedrooms">
          {bedroomsText}
        </li>
        <li className="property__feature property__feature--adults">
          Max {offer.maxAdults} adults
        </li>
      </ul>
      <div className="property__price">
        <b className="property__price-value">&euro;{offer.price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>
      <div className="property__inside">
        <h2 className="property__inside-title">What&apos;s inside</h2>
        <ul className="property__inside-list">
          {offer.goods.map((good) => (
            <li className="property__inside-item" key={`good-${good}`}>
              {good}
            </li>
          ))}
        </ul>
      </div>
      <div className="property__host">
        <h2 className="property__host-title">Meet the host</h2>
        <div className="property__host-user user">
          <div className={`property__avatar-wrapper user__avatar-wrapper ${offer.host.isPro ? 'property__avatar-wrapper--pro' : ''}`}>
            <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
              alt="Host avatar"
            />
          </div>
          <span className="property__user-name">
            {offer.host.name}
          </span>
          {
            offer.host.isPro &&
            <span className="property__user-status">
              Pro
            </span>
          }
        </div>
        <div className="property__description">
          <p className="property__text">
            {offer.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default RoomDescription;
