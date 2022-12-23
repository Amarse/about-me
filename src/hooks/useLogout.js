import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { authService } from 'Fbase.js';
import { AuthContext } from '../centext/user.context.js';

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = AuthContext();

  const logout = () => {
    setError(null);
    setIsPending(true);

    signOut(authService)
      .then(() => {
        dispatch({ type: 'logout' });
        setError(null);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  return { error, isPending, logout };
};

// 다시 한번 보기
