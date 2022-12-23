import { useState } from 'react';
import { authService } from 'Fbase.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { AuthContext } from '../context/user.context.js';

export const useSignup = () => {
  const [error, setError] = useState(null);

  const [isPending, setIsPending] = useState(false);
  const { dispatch } = AuthContext;

  const signup = (email, password, nickName) => {
    setError(null);
    setIsPending(true);
    createUserWithEmailAndPassword(authService, email, password)
      .then((credential) => {
        const user = credential.user;

        if (!user) {
          throw new Error('회원가입에 실패했습니다.');
        }

        updateProfile(authService.currentUser, { nickName })
          .then(() => {
            dispatch({ type: 'login', payload: user });
            setError(null);
            setIsPending(false);
          })
          .catch((err) => {
            setError(err.message);
            setIsPending(false);
          });
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  return { error, isPending, signup };
};

// 다시 한번 보기 프로필 부분 다시 생각해보기
