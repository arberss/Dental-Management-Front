interface UseCheckRoleProps {
  roles?: string[];
  userRoles?: string[];
  checkEachRole?: boolean;
}

const useCheckRole = ({
  roles,
  userRoles,
  checkEachRole = false,
}: UseCheckRoleProps) => {
  if (!roles || !userRoles) return true;

  if (checkEachRole) {
    return roles.every((key) => userRoles?.includes(key));
  } else {
    return roles.some((key) => {
      return userRoles?.includes(key);
    });
  }
};

export default useCheckRole;
