import { useState } from 'react';
import { authService, firebaseInstance } from 'Fbase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../context/user.context.js';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = AuthContext;
  const navigate = useNavigate();
  const googleLogin = () => {
    let provider;
    provider = new firebaseInstance.auth.GoogleAuthProvider();
    authService.signInWithPopup(provider).then(() => {
      navigate('/');
    });
  };

  const login = (email, password) => {
    setError(null);
    setIsPending(true);

    signInWithEmailAndPassword(authService, email, password)
      .then((credential) => {
        const user = credential.user;
        dispatch({ type: 'login', payload: user });
        setError(null);
        setIsPending(false);
        navigate('/');
        
        if (!user) {
          throw new Error('회원가입에 실패했습니다.');
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  return { error, isPending, login, googleLogin };
};

// 다시 한번 보기 가입 어떻게 이루어지는지 다시 생각해보기
