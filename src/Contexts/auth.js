import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useState } from "react";
import { auth, firestore } from "../Config/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();
const initialState = {
  isAuth: false,
  user: {},
};

const AuthProvider = ({ children }) => {
  let [state, setContextState] = useState(initialState);
  let [isAppLoading, setisAppLoading] = useState(true);

  const readProfile = useCallback(async (user) => {
    const docRef = doc(firestore, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const user = docSnap.data();
      setContextState((s) => ({ ...s, isAuth: true, user }));
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    setisAppLoading(false);
  }, []);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        readProfile(user);
      } else {
        console.log("user logged out");
        setisAppLoading(false);
      }
    });
  }, []);

  // //  Logout function
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setContextState(initialState);
        window.notify("User logged out successfully", "success");
      })
      .catch((error) => {
        window.notify("Something went wrong", "error");
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, setContextState, handleLogout, isAppLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
