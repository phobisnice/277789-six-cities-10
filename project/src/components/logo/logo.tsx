import {AppRoute} from '../../const';
import {NavLink} from 'react-router-dom';

function Logo(): JSX.Element {
  return (
    <NavLink
      className={({isActive}) => isActive ? 'header__logo-link header__logo-link--active' : 'header__logo-link'}
      end
      to={AppRoute.Root}
    >
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </NavLink>
  );
}

export default Logo;
