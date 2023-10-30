
import { ReactNode, createContext } from "react";
import Cookies from "universal-cookie";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from "../services/firebaseConfig";
import SessionConstants from "../constants/SessionConstants";
import { checkUserAuth } from "../utils/checkUserAuth";
import { UserCredential } from "firebase/auth";

interface UserAuthentcationContextType {
  handleCreateUser: (values: IFormSignUp) => void;
  handleAuthUser: (
    values: IFormSignIn
  ) => Promise<{ userAuth: UserCredential | undefined; } | undefined>;
  handleSessionUser: () => void;
}

interface UserAuthentcationContextProps {
  children: ReactNode;
}

export interface IFormSignIn {
  email: string;
  password: string;
}

export interface IFormSignUp extends IFormSignIn {
  confirmPassword: string;
}

const UserAuthenticationContext = createContext(
  {} as UserAuthentcationContextType
);

const UserAuthenticationContextProvider: React.FC<UserAuthentcationContextProps> = ({
  children,
}) => {

  const [
    createUserWithEmailAndPassword,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [
    signInWithEmailAndPassword,
    userAuth,
  ] = useSignInWithEmailAndPassword(auth);


  const handleAuthUser = async (values: IFormSignIn) => {
    const { email, password } = values;
    const newCookies = new Cookies();
    try {
      signInWithEmailAndPassword(email, password).then((user) => {
        user!.user.getIdToken().then((idToken) => {
          newCookies.set(SessionConstants.ACCESS_TOKEN_COOKIE_KEY, idToken);
          window.location.pathname = "/home"
        })
      }).catch((error) => {
        console.error(error);
      })
      return {userAuth} 

    } catch (error) {
      alert("Algo deu errado")
    }
  };

  const handleCreateUser = async (values: IFormSignUp) => {
    const { email, password } = values;
    try {
      await createUserWithEmailAndPassword(email, password)
      window.location.pathname = "/"
    } catch (error) {
      alert("Algo deu errado")
    }
  };


  const [signOut] = useSignOut(auth);

  const handleSessionUser = async () => {
    try {
      if (checkUserAuth()) {
        signOut().then((success) => {
          if (success) window.location.pathname = "/"
        }).catch(() => {
          alert("Algo deu errado")
        })
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserAuthenticationContext.Provider
      value={{ handleCreateUser, handleAuthUser, handleSessionUser }}
    >
      {children}
    </UserAuthenticationContext.Provider>
  );
};

export default UserAuthenticationContext;
export { UserAuthenticationContextProvider };