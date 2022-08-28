import PlacesList from '../../components/places-list/places-list';
import ReviewsList from '../../components/reviews-list/reviews-list';
import RoomGallery from '../../components/room-gallery/room-gallery';
import ReviewForm from '../../components/review-form/review-form';
import RoomDescription from '../../components/room-description/room-description';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import {City} from '../../types/offer';
import {DEFAULT_CITY, PlaceCount, PlaceCardType} from '../../const';
import {getCityByName, checkAuthStatus} from '../../helpers';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useEffect} from 'react';
import {getCommentsAction, getNearOffersAction, getOfferAction} from '../../store/api-actions';
import {getOffer, getNearOffers, getComments} from '../../store/offer-data/selectors';
import {getUserAuthorizationStatus} from '../../store/user-data/selector';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useParams} from 'react-router-dom';

const defaultCity = getCityByName(DEFAULT_CITY);

function Room(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getOfferAction(id));
    dispatch(getCommentsAction(id));
    dispatch(getNearOffersAction(id));
  }, [dispatch, id]);

  const offer = useAppSelector(getOffer);
  const nearOffers = useAppSelector(getNearOffers);
  const comments = useAppSelector(getComments);
  const authorizationStatus = useAppSelector(getUserAuthorizationStatus);

  const nearPlaces = nearOffers.slice(0, PlaceCount.Near);
  const mapPlaces = nearPlaces.slice();

  if (offer) {
    mapPlaces.push(offer);
  }

  const currentCity: City = offer ? offer.city : defaultCity;

  return (
    <div className="page" data-testid="room-page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          {offer && <RoomGallery images={offer.images} />}
          <div className="property__container container">
            <div className="property__wrapper">
              {offer && <RoomDescription offer={offer} />}
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <ReviewsList reviews={comments} />
                {checkAuthStatus(authorizationStatus) && <ReviewForm hotelId={id} />}
              </section>
            </div>
          </div>
          {offer && (
            <Map
              activePlaceId={offer.id}
              city={currentCity}
              points={mapPlaces}
              className={'property__map'}
              style={{maxWidth: '1140px', margin: '0 auto 50px'}}
            />
          )}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList
                places={nearPlaces}
                kind={PlaceCardType.Near}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
