import {Link} from 'react-router-dom';
import {FormEvent, useRef} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {checkValueByRegexp} from '../../helpers';
import {AppRoute, EMAIL_REGEXP, PASSWORD_REGEXP, ValidateError} from '../../const';
import {loginAction} from '../../store/api-actions';
import Logo from '../../components/logo/logo';

function Login() :JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const loginSubmitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const emailValue = emailRef.current !== null ? emailRef.current.value : '';
    const passwordValue = passwordRef.current !== null ? passwordRef.current.value : '';

    if (checkValueByRegexp(emailValue, EMAIL_REGEXP, ValidateError.Email) && checkValueByRegexp(passwordValue, PASSWORD_REGEXP, ValidateError.Password)) {
      dispatch(loginAction({
        email: emailValue,
        password: passwordValue,
      }));
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={loginSubmitHandle} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={emailRef} className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Root}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
