import Cookies from "universal-cookie";
import SessionConstants from "../../constants/SessionConstants";

export const checkUserAuth = () => {
  const newCookies = new Cookies();
  const userToken = newCookies.get(SessionConstants.ACCESS_TOKEN_COOKIE_KEY);

  return !!userToken;
};