import './calender.modules.scss';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import {
  format,
  addMonths,
  subMonths,
  parse,
  isSameMonth,
  isSameDay,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import DiaryWrite from 'features/diary';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className='header row'>
      <div className='col col-month'>
        <Icon icon='bi:arrow-left-circle-fill' onClick={prevMonth} />
      </div>
      <div className='col col-first'>
        <span className='text'>
          <span className='text year'>{format(currentMonth, 'yyyy')}년 </span>
          <span className='text month'>{format(currentMonth, 'M')}월</span>
        </span>
      </div>
      <div className='col col-month col-end'>
        <Icon icon='bi:arrow-right-circle-fill' onClick={nextMonth} />
      </div>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ['일', '월', '화', '수', '목', '금', '토'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className='col' key={i}>
        {date[i]}
      </div>
    );
  }

  return <div className='days row'>{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? 'disabled'
              : isSameDay(day, selectedDate)
              ? 'selected'
              : format(currentMonth, 'M') !== format(day, 'M')
              ? 'not-valid'
              : 'valid'
          }`}
          key={day}
          onClick={() => onDateClick(parse(cloneDay))}
        >
          <span
            className={
              format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : ''
            }
          >
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className='row' key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className='body'>{rows}</div>;
};

const Calender = (props) => {
  console.log('user',props)
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDiaryOpen, setIsDiaryOpen] = useState(false);
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const onClick = (event) => {
    event.preventDefault();
    setIsDiaryOpen(true)
  }

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
      />
      <Icon icon='ph:pencil-line-thin' onClick={onClick} />
      {isDiaryOpen && (
        <DiaryWrite isDiaryOpen={isDiaryOpen} userObj={props.userObj} selectedDate={selectedDate} setIsDiaryOpen={setIsDiaryOpen}/>
      )}
    </div>
  );
};

export default Calender;
