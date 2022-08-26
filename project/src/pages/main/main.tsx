import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import EmptyPlacesList from '../../components/empty-places-list/empty-places-list';
import PlacesSort from '../../components/places-sort/places-sort';
import Header from '../../components/header/header';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {changeCity, changeSortType} from '../../store/hotels-data/hotels-data';
import {getPlacesByCity, getCity, getSortType, getActivePlaceId} from '../../store/hotels-data/selectors';
import {fetchOffersAction} from '../../store/api-actions';
import {CITIES, SORT_TYPES} from '../../const';
import {useEffect} from 'react';

const Setting = {
  CARDS_TO_SHOW: 5,
  KIND: 'cities',
} as const;

function Main() :JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const currentCity = useAppSelector(getCity);
  const sortType = useAppSelector(getSortType);
  const activePlaceId = useAppSelector(getActivePlaceId);
  const placesByCity = useAppSelector(getPlacesByCity);

  const onCityClickHandle = (city: typeof CITIES[number]['name']) => {
    if (currentCity.name !== city) {
      dispatch(changeCity(city));
    }
  };

  const onSortClickHandle = (type: typeof SORT_TYPES[number]) => {
    if (sortType !== type) {
      dispatch(changeSortType(type));
    }
  };

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={`page__main page__main--index ${!placesByCity.length ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList
            currentCity={currentCity}
            onClickHandle={onCityClickHandle}
          />
        </div>
        {
          placesByCity.length ?
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{`${placesByCity.length} places to stay in ${currentCity.name}`}</b>
                  <PlacesSort
                    onClickHandle={onSortClickHandle}
                    activeSortType={sortType}
                  />
                  <div className="cities__places-list places__list tabs__content">
                    <PlacesList
                      places={placesByCity.slice(0, Setting.CARDS_TO_SHOW)}
                      kind={Setting.KIND}
                    />
                  </div>
                </section>
                <div className="cities__right-section">
                  <Map
                    city={currentCity}
                    points={placesByCity}
                    activePlaceId={activePlaceId}
                    className={'cities__map'}
                  />
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
