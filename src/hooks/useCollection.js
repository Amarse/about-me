import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { dbService } from 'Fbase.js';

export const useCollection = (transaction, myQuery) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let q;
    if (myQuery) {
      q = query(
        collection(dbService, transaction),
        where(...myQuery),
        orderBy('date', 'desc')
      );
    }
    const unsubscribe = onSnapshot(
      myQuery ? q : collection(dbService, transaction),
      (snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(result);
        setError(null);
      },
      (error) => {
        setError(error.message);
      }
    );

    return unsubscribe;
  }, [collection]);


  return { documents, error };
};

// 다시 한번 보기 파이어베이스부터 다시보기


