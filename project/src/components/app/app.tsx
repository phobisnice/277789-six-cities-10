import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Loader from '../loader/loader';
import {Reviews} from '../../types/review';
import {useAppSelector} from '../../hooks/useAppSelector';

type AppProps = {
  reviews: Reviews
}

function App({reviews} : AppProps) : JSX.Element {
  const {isDataLoading} = useAppSelector((state) => state);

  return (
    <>
      {isDataLoading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Main />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth} >
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth} isLoginPage>
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Room}
            element={<Room reviews={reviews} />}
          />
          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
