import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { api } from 'app/services/api';
import { getTags } from 'app/store/tag/actions';
import { getRoles } from 'app/store/role/actions';
import useAuth from 'app/hooks/useAuth';
import Loader from 'app/main/layouts/ClientLayout/Loader';

const Auth = ({ children }) => {
  const { pending, signInToken } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = api.getToken();
    if (token) {
      api.token = token;
      signInToken();
    }

    dispatch(getTags());
    dispatch(getRoles());
  }, [dispatch, signInToken]);

  if (pending) return <Loader />;

  return <React.Fragment>{children}</React.Fragment>;
};

export default Auth;
