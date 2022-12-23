import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { useReducer } from 'react';
import { dbService, timeStemp } from 'Fbase.js';

const initState = {
  document: null,
  inPending: false,
  error: null,
  success: false,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case 'inPending':
      return { isPending: true, document: null, success: false, error: null };
    case 'addDoc':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'deleteDoc':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'error':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirebaseStore = (transaction) => {
  console.log('ddd', transaction);
  const [response, dispatch] = useReducer(storeReducer, initState);
  // 참조 요구
  const collectionRef = collection(dbService, transaction);

  // 문서 추가
  const addDocument = async ( doc ) => {
    console.log(doc)
    dispatch({ type: 'isPanging' });
    try {
      const createdTime = timeStemp.fromDate(new Date());
      const documentRef = await addDoc(collectionRef, { ...doc, createdTime });
      dispatch({ type: 'addDoc', payload: documentRef });
    } catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }
  };

  // 문서 삭제
  const deleteDocument = async (id) => {
    dispatch({ type: 'isPending' });
    try {
      const documentRef = await deleteDoc(doc(collectionRef, id));

      dispatch({ type: 'deleteDoc', payload: documentRef });
    } catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }
  };


  return { addDocument, deleteDocument, response };
};

// 다시 한번 보기
