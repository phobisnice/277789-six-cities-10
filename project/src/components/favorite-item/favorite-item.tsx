import {Offers} from '../../types/offer';
import PlacesList from '../places-list/places-list';

type FavoriteItemProps = {
  places: Offers;
  city: string;
}

const Setting = {
  KIND: 'favorites'
} as const;

function FavoriteItem({places, city} : FavoriteItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        <PlacesList
          places={places}
          kind={Setting.KIND}
        />
      </div>
    </li>
  );
}

export default FavoriteItem;
