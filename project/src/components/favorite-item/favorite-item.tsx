import {Offers} from '../../types/offer';
import PlacesList from '../places-list/places-list';
import {MouseEvent} from 'react';
import {changeCity} from '../../store/hotels-data/hotels-data';
import {AppRoute, PlaceCardType} from '../../const';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useNavigate} from 'react-router-dom';

type FavoriteItemProps = {
  places: Offers;
  city: string;
}

function FavoriteItem({places, city} : FavoriteItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const favoriteCityClickHandle = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCity(city));
    navigate(AppRoute.Root);
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/" onClick={favoriteCityClickHandle} data-testid="favorite-city">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        <PlacesList
          places={places}
          kind={PlaceCardType.Favorite}
        />
      </div>
    </li>
  );
}

export default FavoriteItem;
