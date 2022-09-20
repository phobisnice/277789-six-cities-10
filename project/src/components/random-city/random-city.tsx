import {AppRoute, CITIES} from '../../const';
import {getRandomValueFromArray} from '../../helpers';
import {MouseEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {changeCity} from '../../store/hotels-data/hotels-data';

function RandomCity(): JSX.Element {
  const {name: randomCityName} = getRandomValueFromArray(CITIES);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const randomCityClickHandle = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCity(randomCityName));
    navigate(AppRoute.Root);
  };

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <a className="locations__item-link" onClick={randomCityClickHandle} href="/">
          <span>{randomCityName}</span>
        </a>
      </div>
    </section>
  );
}

export default RandomCity;
