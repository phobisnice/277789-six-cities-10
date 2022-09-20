import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Loader from '../loader/loader';
import {useAppSelector} from '../../hooks/useAppSelector';
import {checkLoadingAuthStatus} from '../../helpers';
import {getUserAuthorizationStatus} from '../../store/user-data/selector';
import {getDataLoadingStatus} from '../../store/hotels-data/selectors';
import {getOfferLoadingStatus} from '../../store/offer-data/selectors';
import {getWishlistLoadingStatus} from '../../store/favorite-data/selectors';

function App() : JSX.Element {
  const authorizationStatus = useAppSelector(getUserAuthorizationStatus);
  const isDataLoading = useAppSelector(getDataLoadingStatus);
  const isOfferLoading = useAppSelector(getOfferLoadingStatus);
  const isWishlistLoading = useAppSelector(getWishlistLoadingStatus);

  const isLoading = isDataLoading || isOfferLoading || isWishlistLoading || checkLoadingAuthStatus(authorizationStatus);

  return (
    <>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              isLoginPage
            >
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={<Room />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
      {isLoading && <Loader />}
    </>
  );
}

export default App;
