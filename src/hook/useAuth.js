import { useContext } from 'react';
import { AuthContext } from '../centext/user.context.js';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};
