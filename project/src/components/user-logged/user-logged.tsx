import {MouseEvent, memo} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {logoutAction} from '../../store/api-actions';

type UserLoggedProps = {
  wishlistCount: number,
  email: string,
  avatar: string,
}

function UserLogged({email, wishlistCount, avatar}: UserLoggedProps): JSX.Element {
  const dispatch = useAppDispatch();

  const logoutClickHandle = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <>
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoute.Favorites}
          data-testid="login-wishlist-link"
        >
          <div
            className="header__avatar-wrapper user__avatar-wrapper"
            style={{
              backgroundImage: `url(${avatar})`
            }}
          >
          </div>
          <span className="header__user-name user__name">{email}</span>
          <span className="header__favorite-count">{wishlistCount}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <a
          className="header__nav-link"
          href="/"
          onClick={logoutClickHandle}
          data-testid="login-signout-link"
        >
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </>
  );
}

export default memo(UserLogged);
