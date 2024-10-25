import React, { useContext, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import SimpleLightBox from "simple-react-lightbox";

import SimpleAuthProvider, {
  SimpleAuthContext,
} from "app/context/SimpleAuthProvider";
import AppLayout from "app/AppLayout";
import RenderRoutes from "app/routing/route.util";
import routes from "app/routing/routes";
import store from "app/store";
import Auth from "app/main/auth/Auth";
import PageNotFound from "app/main/_error";
import MDThem from "app/main/theme/ThemeProvider";
import ModalWrapper from "app/main/shared-components/ModalWrapper";
import { StripeProvider } from "app/context/stripe";
import SiteProtection from "app/main/layouts/SiteProtection";

const Main = () => {
  const { isAuthenticated } = useContext(SimpleAuthContext);
  if (isAuthenticated || process.env.REACT_APP_BLOCKY == 0) {
    return (
      <MDThem>
        <AppLayout>
          <Suspense fallback={PageNotFound}>
            <ModalWrapper />
            <RenderRoutes routes={routes} />
          </Suspense>
        </AppLayout>
      </MDThem>
    );
  } else {
    return <SiteProtection />;
  }
};

const App = () => {
  return (
    <SimpleAuthProvider>
      <Provider store={store}>
        <SimpleLightBox>
          <SnackbarProvider maxSnack={3}>
            <Router>
              <StripeProvider>
                {/* <CookiesNotification /> */}
                <ModalWrapper />
                <Auth>
                  <Main />
                </Auth>
              </StripeProvider>
            </Router>
          </SnackbarProvider>
        </SimpleLightBox>
      </Provider>
    </SimpleAuthProvider>
  );
};

export default App;
