import { useLocation } from "react-router-dom";

import { matched } from "app/routing/route.util";
import routes from "app/routing/routes";

const useMatchRoute = () => {
  const location = useLocation();
  const pathname = location.pathname
    ? location.pathname
    : location.location.pathname;

  const matchedRoute = matched(pathname, routes);
  const isAdminRoute = matchedRoute?.auth.includes("admin");
  const isHomePage = matchedRoute?.key === "home";
  const isGuestPage = matchedRoute && matchedRoute.auth.includes("guest");

  const isAdminProtected =
    matchedRoute &&
    matchedRoute.auth.findIndex((item) => item === "admin") > -1;

  return {
    matchedRoute,
    isAdminProtected,
    isAdminRoute,
    isHomePage,
    isGuestPage,
  };
};

export default useMatchRoute;
