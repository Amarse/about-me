import './diary.modules.scss';
import { DiaryContext } from 'centext/diary.context.js';
import React, { useContext } from 'react';
import { useFirebaseStore } from 'hooks/useStore.js';
import { Icon } from '@iconify/react';

const Diary = () => {
  const openHandler = useContext(DiaryContext);
  const { deleteDocument } = useFirebaseStore('diary');
  const data = openHandler.openState.data;

  return (
    <section className='diaryContainer'>
      <h2>{data.title}</h2>
      <span>{data.date}</span>
      <img src={data.photo} />
      <p>{data.content}</p>
      <div className='buttonContainer'>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete it?')) {
              deleteDocument(data.id);
              openHandler.updateOpenHandler(false, '', data);
            }
          }}
        >
          delete
        </button>
        <button>modify</button>
        <button
          onClick={() => {
            openHandler.updateOpenHandler(false, '', data);
          }}
        >
          ❌close
        </button>
      </div>
    </section>
  );
};

export default Diary;
