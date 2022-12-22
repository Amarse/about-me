import { useState } from 'react';
import { authService } from 'Fbase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setError(null);
    setIsPending(true);

    signInWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: 'login', payload: user });
        setError(null);
        setIsPending(false);

        if (!user) {
          throw new Error('회원가입에 실패했습니다.');
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  return { error, isPending, login };
};


// 다시 한번 보기 가입 어떻게 이루어지는지 다시 생각해보기