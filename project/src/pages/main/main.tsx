import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import EmptyPlacesList from '../../components/empty-places-list/empty-places-list';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {changeCity, changeCurrentOffers, changeSortType} from '../../store/action';
import {fetchOffers} from '../../store/api-actions';
import {CITIES, SORT_TYPES} from '../../const';
import {useEffect} from 'react';
import PlacesSort from '../../components/places-sort/places-sort';
import Header from '../../components/header/header';

const Setting = {
  CARDS_TO_SHOW: 5,
  KIND: 'cities',
} as const;

function Main() :JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const onCityClickHandle = (city: typeof CITIES[number]['name']) => {
    dispatch(changeCity(city));
    dispatch(changeCurrentOffers());
  };

  const onSortClickHandle = (sortType: typeof SORT_TYPES[number]) => {
    dispatch(changeSortType(sortType));
    dispatch(changeCurrentOffers());
  };

  const {placesByCity, city: currentCity, sortType, activePlaceId} = useAppSelector((state) => state);

  return (
    <div className="page page--gray page--main">
      <Header />

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
