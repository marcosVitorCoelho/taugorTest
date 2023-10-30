import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserAuth } from "../../utils/checkUserAuth";
import App_Routes from "../../constants/RoutesConstants";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();

  const isUserAuthenticated = checkUserAuth();

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate(App_Routes.PUBLIC.login);
    }
  }, [isUserAuthenticated, navigate]);

  return (
    <>
      {!isUserAuthenticated && null}
      {isUserAuthenticated && children}
    </>
  );
};

export default PrivateRoute;