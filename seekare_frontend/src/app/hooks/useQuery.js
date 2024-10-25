import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const params = new URLSearchParams(useLocation().search);
  const queries = {};
  for (const param of params) {
    queries[param[0]] = param[1];
  }

  return {
    query: new URLSearchParams(useLocation().search),
    ...queries,
  };
};

export default useQuery;
