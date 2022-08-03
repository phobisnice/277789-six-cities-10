import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import EmptyPlacesList from '../../components/empty-places-list/empty-places-list';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {changeCity, changeCurrentOffers, changeSortType, loadOffers} from '../../store/action';
import {CITIES, SORT_TYPES} from '../../const';
import {useEffect} from 'react';
import PlacesSort from '../../components/places-sort/places-sort';

const Setting = {
  CARDS_TO_SHOW: 5,
  KIND: 'cities',
} as const;

function Main() :JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadOffers());
  }, [dispatch]);

  const onCityClickHandle = (city: typeof CITIES[number]['name']) => {
    dispatch(changeCity({city: city}));
    dispatch(changeCurrentOffers());
  };

  const onSortClickHandle = (sortType: typeof SORT_TYPES[number]) => {
    dispatch(changeSortType({sortType: sortType}));
    dispatch(changeCurrentOffers());
  };

  const {placesByCity, city: currentCity, sortType, activePlaceId} = useAppSelector((state) => state);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index ${!placesByCity.length ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList currentCity={currentCity} onClickHandle={onCityClickHandle} />
        </div>
        {
          placesByCity.length ?
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{`${placesByCity.length} places to stay in ${currentCity.name}`}</b>
                  <PlacesSort onClickHandle={onSortClickHandle} activeSortType={sortType} />
                  <div className="cities__places-list places__list tabs__content">
                    <PlacesList places={placesByCity.slice(0, Setting.CARDS_TO_SHOW)} kind={Setting.KIND} />
                  </div>
                </section>
                <div className="cities__right-section">
                  <Map city={currentCity} points={placesByCity} activePlaceId={activePlaceId} className={'cities__map'} />
                </div>
              </div>
            </div>
            :
            <EmptyPlacesList />
        }
      </main>
    </div>
  );
}

export default Main;
