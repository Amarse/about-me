import './modal.modules.scss';
import React, { useContext } from "react";

import { DiaryContext } from "centext/diary.context.js";
import DiaryForm from "../../diary/diary-form";

import Diary from "../../diary";

const WriteModal = (props) => {
  const user  = props.user;
  const openHandler = useContext(DiaryContext);
  return (
    <div
      className="diaryFormContainer"
      onClick={() => {
        openHandler.updateOpenHandler(false, "", openHandler.openState.data);
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {openHandler.openState.data === null && <DiaryForm uid={user.uid} />}
        {openHandler.openState.data && <Diary />}
      </div>
    </div>
  );
};

export default WriteModal;