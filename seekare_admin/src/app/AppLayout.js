import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import Pusher from "pusher-js";
import { useSnackbar } from "notistack";

import layouts from "./main/layouts";
import PageNotFound from "./main/_error";
import useMatchRoute from "./hooks/useMatchRoute";

// const pusher = new Pusher("APP_KEY", {
//   cluster: "APP_CLUSTER",
//   encrypted: true,
// });

const AppLayout = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { matchedRoute, isAdminRoute } = useMatchRoute();

  const snackbar = useSelector((state) => state.ui.snackbar);

  // useEffect(() => {
  //   const channel = pusher.subscribe("questions");
  //   channel.bind("vote", (data) => {
  //     const { _id, likes, dislikes } = data;
  //   });

  //   return pusher.unsubscribe("questions");
  // }, []);

  useEffect(() => {
    if (snackbar.message !== "") {
      enqueueSnackbar(snackbar.message, {
        variant: snackbar.variant,
        preventDuplicate: true,
        autoHideDuration: 2000,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        color: "#ccc",
        onClick: () => closeSnackbar(),
      });
    }
  }, [enqueueSnackbar, snackbar, closeSnackbar]);

  if (!matchedRoute) {
    return <PageNotFound fallbackurl={`${isAdminRoute ? "/admin" : ""}`} />;
  }

  const Layout = layouts[matchedRoute["layout"]];

  return <Layout>{children}</Layout>;
};

export default AppLayout;
