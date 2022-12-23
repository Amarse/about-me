import './diary.modules.scss';
import { DiaryContext } from 'context/diary.context.js';
import React, { useContext } from 'react';
import { useFirebaseStore } from 'hooks/useStore.js';
import { Icon } from '@iconify/react';

const Diary = () => {
  const openHandler = useContext(DiaryContext);
  const { deleteDocument } = useFirebaseStore('diary');
  const data = openHandler.openState.data;
 

  return (
    <section className='diary-container'>
    
      <h2>{data.title}</h2>
      <span>{data.date}</span>
      <img src={data.photo} />
      <p>{data.content}</p>
      <div className='button-container'>
        <button
          onClick={() => {
            if (window.confirm('삭제 하시겠습니까?')) {
              deleteDocument(data.id);
              openHandler.updateOpenHandler(false, '', data);
            }
          }}
        >
          🪣 삭제 🪣
        </button>
        {/* <button>modify</button> */}
        <button
          onClick={() => {
            openHandler.updateOpenHandler(false, '', data);
          }}
        >
          ❌ 닫기 ❌
        </button>
      </div>
    </section>
  );
};

export default Diary;
