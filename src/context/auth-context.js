import React, { createContext, useState } from "react";

const AuthContext = createContext({
  isAuth: false,
  login: () => {},
});

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = () => {
    setIsAuthenticated(true);
  };

  const context = {
    isAuth: isAuthenticated,
    login: loginHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
