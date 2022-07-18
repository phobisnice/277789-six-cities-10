import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRoute = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  isLoginPage?: boolean
};

function PrivateRoute(props : PrivateRoute): JSX.Element {
  const {authorizationStatus, children, isLoginPage} = props;
  const authAction = isLoginPage ? <Navigate to={AppRoute.Root} /> : children;
  const noAuthAction = isLoginPage ? children : <Navigate to={AppRoute.Login} />;
  return (
    authorizationStatus === AuthorizationStatus.Auth ? authAction : noAuthAction
  );
}

export default PrivateRoute;
