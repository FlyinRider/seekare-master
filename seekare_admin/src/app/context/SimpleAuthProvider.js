import React, { useState, useContext } from "react";
import Cookies from "js-cookie";

export const SIMPLE_AUTH_COOKIE = "MD_SIMPLE_AUTH_COOKIE";

export const SimpleAuthContext = React.createContext({
  isAuthenticated: false,
  setAuthenticated: () => {},
});

const SimpleAuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(
    Cookies.get(SIMPLE_AUTH_COOKIE) === "ok"
  );

  return (
    <SimpleAuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </SimpleAuthContext.Provider>
  );
};

export const useSiteBasicAuth = () => {
  const context = useContext(SimpleAuthContext);
  if (context === undefined) {
    throw new Error(
      "useSiteBasicAuth hook must be used within a SiteBasicAuthProvider component"
    );
  }
  return context;
};

export default SimpleAuthProvider;
