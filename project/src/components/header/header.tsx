import {useAppSelector} from '../../hooks/useAppSelector';
import UserLogged from '../user-logged/user-logged';
import UserNotLogged from '../user-not-logged/user-not-logged';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  const {user, wishlist} = useAppSelector((state) => state);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                user ? <UserLogged wishlistCount={wishlist.length} name={user.name} avatar={user.avatarUrl} /> : <UserNotLogged />
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
