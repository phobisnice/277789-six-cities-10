import {FormEvent, useRef} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {checkValueByRegexp} from '../../helpers';
import {REGEXP_TYPES, ValidateError} from '../../const';
import {loginAction} from '../../store/api-actions';
import Logo from '../../components/logo/logo';
import RandomCity from '../../components/random-city/random-city';

function Login() :JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const loginSubmitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const emailValue = emailRef.current !== null ? emailRef.current.value : '';
    const passwordValue = passwordRef.current !== null ? passwordRef.current.value : '';
    const isEmailValid = checkValueByRegexp(emailValue, REGEXP_TYPES.email, ValidateError.Email);
    const isPasswordValid = checkValueByRegexp(passwordValue, REGEXP_TYPES.password, ValidateError.Password);

    if (isEmailValid && isPasswordValid) {
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
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <RandomCity />
        </div>
      </main>
    </div>
  );
}

export default Login;
