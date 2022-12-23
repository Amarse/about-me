import { useContext } from 'react';
import { AuthContext } from 'context/user.context.js';

export const useAuthContext = () => { 
  const context = useContext(AuthContext);

  return context;
};
