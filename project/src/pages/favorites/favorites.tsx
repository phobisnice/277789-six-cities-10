import {Offers, OffersByCity} from '../../types/offer';
import FavoriteItem from '../../components/favorite-item/favorite-item';
import {useAppSelector} from '../../hooks/useAppSelector';
import Header from '../../components/header/header';
import EmptyFavorites from '../../components/empty-favorites/empty-favorites';
import {Link} from 'react-router-dom';
import {getWishlist} from '../../store/favorite-data/selectors';
import {AppRoute} from '../../const';

const getPlacesByCity = (places: Offers): OffersByCity[] => {
  const placesByCity: OffersByCity[] = [];

  places.forEach((place) => {
    const placeCity = placesByCity.filter((item) => item.name === place.city.name);

    if (placeCity.length) {
      placeCity[0].offers.push(place);
    } else {
      placesByCity.push({
        name: place.city.name,
        offers: [place]
      } as OffersByCity);
    }
  });

  return placesByCity;
};

function Favorites(): JSX.Element {
  const wishlist = useAppSelector(getWishlist);

  const cities = getPlacesByCity(wishlist);

  return (
    <div className="page" data-testid="favorites-page">
      <Header />

      {
        wishlist.length ?
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {
                    cities.map((city) => (
                      <FavoriteItem
                        places={city.offers}
                        city={city.name}
                        key={city.name}
                      />
                    ))
                  }
                </ul>
              </section>
            </div>
          </main> :
          <EmptyFavorites />
      }
      <footer className="footer container">
        <Link
          className="footer__logo-link"
          to={AppRoute.Root}
        >
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
