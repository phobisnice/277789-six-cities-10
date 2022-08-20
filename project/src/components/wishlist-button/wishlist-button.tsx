import {MouseEvent, useState} from 'react';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getUserAuthorizationStatus} from '../../store/user-data/selector';
import {checkAuthStatus} from '../../helpers';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {addToWishlistAction, removeFromWishlistAction} from '../../store/api-actions';

type WishlistButtonProps = {
  isFavorite: boolean,
  type: string
  offerId: number
}

function WishlistButton({isFavorite, type, offerId}: WishlistButtonProps): JSX.Element {
  const [favoriteStatus, setFavoriteStatus] = useState(isFavorite);
  const isFavoriteClass = favoriteStatus ? `${type}__bookmark-button--active` : '';
  const buttonClasses = `${type}__bookmark-button button ${isFavoriteClass}`;
  const buttonText = favoriteStatus ? 'In bookmarks' : 'To bookmarks';

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isUserAuthorization = checkAuthStatus(useAppSelector(getUserAuthorizationStatus));
  const wishlistAction = favoriteStatus ? removeFromWishlistAction(offerId) : addToWishlistAction(offerId);

  const wishlistClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (isUserAuthorization) {
      setFavoriteStatus((prevState) => !prevState);
      dispatch(wishlistAction);
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button
      className={buttonClasses}
      type="button"
      onClick={wishlistClickHandle}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{buttonText}</span>
    </button>
  );
}

export default WishlistButton;
