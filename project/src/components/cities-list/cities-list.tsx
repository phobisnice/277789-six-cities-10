import {CITIES} from '../../const';
import {City} from '../../types/offer';

type CitiesListProps = {
  currentCity: City;
  onClickHandle: (city: typeof CITIES[number]['name']) => void;
}

function CitiesList({currentCity, onClickHandle}: CitiesListProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          CITIES.map((city) => (
            <li className="locations__item" key={city.name}>
              <a className={`locations__item-link tabs__item ${city.name === currentCity.name ? 'tabs__item--active' : ''}`} href="/" onClick={(evt) => {
                evt.preventDefault();
                onClickHandle(city.name);}}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

export default CitiesList;
