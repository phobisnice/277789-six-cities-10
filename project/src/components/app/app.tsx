import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Loader from '../loader/loader';
import {Reviews} from '../../types/review';
import {useAppSelector} from '../../hooks/useAppSelector';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import {checkAuthStatus} from '../../helpers';

type AppProps = {
  reviews: Reviews
}

function App({reviews} : AppProps) : JSX.Element {
  const {authorizationStatus, isDataLoading} = useAppSelector((state) => state);

  if (checkAuthStatus(authorizationStatus) || isDataLoading) {
    return <Loader />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus} >
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus} isLoginPage>
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
    </HistoryRouter>
  );
}

export default App;
