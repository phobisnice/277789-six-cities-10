import {MouseEvent} from 'react';
import {CITIES} from '../../const';
import {City} from '../../types/offer';

type CitiesListProps = {
  currentCity: City;
  onClickHandle: (city: typeof CITIES[number]['name']) => void;
}

function CitiesList({currentCity, onClickHandle}: CitiesListProps): JSX.Element {
  const cityClickHandle = (cityName: typeof CITIES[number]['name']) => (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    onClickHandle(cityName);
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          CITIES.map((city) => {
            const cityClasses = `locations__item-link tabs__item ${city.name === currentCity.name ? 'tabs__item--active' : ''}`;

            return (
              <li className="locations__item" key={city.name}>
                <a
                  className={cityClasses}
                  href="/"
                  onClick={cityClickHandle(city.name)}
                >
                  <span>{city.name}</span>
                </a>
              </li>
            );
          })
        }
      </ul>
    </section>
  );
}

export default CitiesList;
