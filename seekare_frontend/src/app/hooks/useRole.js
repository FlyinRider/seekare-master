import { useSelector } from 'react-redux';

const useRole = () => {
  const roles = useSelector((state) => state.role.items);
  const currentUser = useSelector((state) => state.auth.auth.user_data);

  const getRoleInfo = (id) => {
    const index = roles.findIndex((_item) => _item._id === id);
    return roles[index];
  };

  const currentUserRole = getRoleInfo(currentUser.role);

  return { roles, getRoleInfo, currentUserRole };
};

export default useRole;
