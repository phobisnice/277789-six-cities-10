import Logo from '../logo/logo';
import {PropsWithChildren} from 'react';

type HeaderWrapperProps = PropsWithChildren;

function HeaderWrapper({children}: HeaderWrapperProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {children}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderWrapper;
