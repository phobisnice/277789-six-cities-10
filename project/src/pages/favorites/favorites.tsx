import {Offers, OffersByCity} from '../../types/offer';
import FavoriteItem from '../../components/favorite-item/favorite-item';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useEffect} from 'react';
import {getWishlistItems} from '../../store/api-actions';
import {useAppSelector} from '../../hooks/useAppSelector';
import Header from '../../components/header/header';

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWishlistItems());
  }, [dispatch]);

  const {wishlist} = useAppSelector((state) => state);

  const cities = getPlacesByCity(wishlist);

  return (
    <div className="page">
      <Header />

      {
        wishlist.length ?
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {
                    cities.map((city) => <FavoriteItem places={city.offers} city={city.name} key={city.name} />)
                  }
                </ul>
              </section>
            </div>
          </main> :
          <main className="page__main page__main--favorites page__main--favorites-empty">
            <div className="page__favorites-container container">
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future
                    trips.
                  </p>
                </div>
              </section>
            </div>
          </main>
      }
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
