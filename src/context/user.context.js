import React, { createContext, useEffect, useReducer } from 'react';

import { authService } from 'Fbase';

import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'google':
      return { ...state, user: action.playlod };
    case 'login':
      return { ...state, user: action.payload };
    case 'logout':
      return { ...state, user: null };
    case 'isReady':
      return { ...state, user: action.payload, isReady: true };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isReady: false,
  });

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(authService, (user) => {
      dispatch({ type: 'isReady', payload: user });
    });

    return unSubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
