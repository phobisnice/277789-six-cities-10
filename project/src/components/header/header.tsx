import {useAppSelector} from '../../hooks/useAppSelector';
import UserLogged from '../user-logged/user-logged';
import UserNotLogged from '../user-not-logged/user-not-logged';
import HeaderWrapper from '../header-wrapper/header-wrapper';
import {getUser} from '../../store/user-data/selector';
import {getWishlist} from '../../store/favorite-data/selectors';

function Header(): JSX.Element {
  const user = useAppSelector(getUser);
  const wishlist = useAppSelector(getWishlist);

  return (
    <HeaderWrapper>
      {
        user ?
          <UserLogged
            wishlistCount={wishlist.length}
            email={user.email}
            avatar={user.avatarUrl}
          /> :
          <UserNotLogged />
      }
    </HeaderWrapper>
  );
}

export default Header;
