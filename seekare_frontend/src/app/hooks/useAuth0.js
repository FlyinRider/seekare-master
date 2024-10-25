import createAuth0Client from '@auth0/auth0-spa-js';

const useAuth0 = () => {
  const createAuth0 = async () => {
    return await createAuth0Client({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      client_id: process.env.REACT_APP_AUTH0_DOMAIN,
    });
  };

  return {
    createAuth0,
  };
};

export default useAuth0;
