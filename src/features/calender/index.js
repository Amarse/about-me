import './calender.modules.scss';
import React, { useContext, useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import WriteModal from 'features/ui/write-modal';
import { DiaryContext } from 'context/diary.context.js';
import { useCollection } from 'hooks/useCollection.js';
import RenderCells from './render-cell';
import RenderHeader from './render-header';
import RenderDays from './render-days';
import { Icon } from '@iconify/react';

const Calender = (props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const openHandler = useContext(DiaryContext);
  const user = props.userObj;
  const { documents, error } = useCollection('diary');
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <div className='calendar'>
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        documents={documents !== null && documents}
      />
      <Icon
        className='write'
        icon='ph:pencil-line-thin'
        onClick={() => {
          openHandler.updateOpenHandler(
            true,
            format(selectedDate, 'yyyyMMMdd'),
            openHandler.openState.data
          );
        }}
      />
      {openHandler.openState.isOpen && <WriteModal user={user} />}
      {error && <strong>{error}</strong>}
    </div>
  );
};

export default Calender;
