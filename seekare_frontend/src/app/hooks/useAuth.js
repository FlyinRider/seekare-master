import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signInWithToken } from "app/store/auth/actions";

const useAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector(
    (state) => state.auth.auth.isAuthenticated
  );

  const redirectUrl = useSelector((state) => state.auth.auth.redirect_url);

  const pending = useSelector((state) => state.auth.auth.pending);
  const code = useSelector((state) => state.auth.auth.code);
  const emailConfirming = useSelector(
    (state) => state.auth.auth.emailConfirming
  );
  const currentUser = useSelector((state) => state.auth.auth.user_data);

  const isAdmin = currentUser.role && currentUser.role.title === "admin";
  const isRoot = currentUser.role && currentUser.role.title === "root";
  const isPremiumUser =
    currentUser.role && currentUser.role.title === "premium_user"
      ? true
      : false;
  const isNormalUser = currentUser.role && currentUser.role.title === "user";
  const isMd =
    (currentUser.role && currentUser.role.title === "md") || isAdmin || isRoot;
  const isTriage = currentUser.role && currentUser.role.title === "triage";

  const signInToken = useCallback(
    () => dispatch(signInWithToken()),
    [dispatch]
  );

  const gotoLandingPage = () => {
    if (redirectUrl && redirectUrl !== "") {
      history.push(redirectUrl);

      return;
    }

    switch (currentUser?.role?.title || "") {
      case "user":
        history.push("/wiki");
        break;
      case "premium_user":
        history.push("/wiki");
        break;
      case "triage":
        history.push("/wiki/triage");
        break;
      case "md":
        history.push("/wiki/md");
        break;
      default:
        history.push("/wiki");
        break;
    }
  };

  return {
    signInToken,
    isAuthenticated,
    pending,
    code,
    emailConfirming,
    role: currentUser.role,
    currentUser,
    isAdmin,
    isRoot,
    isNormalUser,
    isTriage,
    isMd,
    isPremiumUser,
    gotoLandingPage,
  };
};

export default useAuth;
