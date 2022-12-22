import './diary.modules.scss';
import { DiaryContext } from 'centext/diary.context';
import React, { useContext, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import DiaryForm from './diary-form';
import { Icon } from '@iconify/react';

const DiaryWrite = ({ userObj, seletedDate, isDiaryOpen, setIsDiaryOpen }) => {
  const openHandler = useContext(DiaryContext);
  const wrapper = useRef();

  const closeModal = (event) => {
    event.preventDefault();
    setIsDiaryOpen(false);
  };

  return (
    <div className='diary-modal-continer'>
      <div className='diary-modal' ref={wrapper} value={isDiaryOpen}>
        <div>
          <Icon
            className='icon'
            icon='ri:close-circle-fill'
            onClick={closeModal}
          />
        </div>
        <div
          onClick={() => {
            openHandler.updateOpenHandler(false, '');
          }}
        ></div>
        <div onClick={(e) => e.stopPropagation()}>
          {openHandler.openState.data === null && (
            <DiaryForm userObj={userObj} seletedDate={seletedDate} />
          )}
          {openHandler.openState.data && <DiaryWrite />}
        </div>
      </div>
    </div>
  );
};

export default DiaryWrite;
