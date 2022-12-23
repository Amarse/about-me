import './render-cell.modules.scss';
import React from 'react';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { useContext } from 'react';
import { DiaryContext } from 'context/diary.context';

const RenderCells = ({
  currentMonth,
  selectedDate,
  onDateClick,
  documents,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const openHandler = useContext(DiaryContext);
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      let data;
      documents &&
        documents.forEach((doc) => {
          console.log(doc.id)
          let dir = {
            content: doc.content,
            uid: doc.uid,
            photo: doc.photo,
            title: doc.title,
            date: doc.date,
            id: doc.id,
          };
          if (dir.date === format(day, 'yyyyMMMdd')) {
            data = dir;
            console.log(data);
          }
        });
      days.push(
        <li
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
          onClick={() => {
            onDateClick(cloneDay);
            openHandler.updateOpenHandler(false, '', null);
            {
              data && openHandler.updateOpenHandler(true, '', data);
              console.log(data);
            }
          }}
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
          <div
            style={{
              width: '100px',
              height: '75px',
              backgroundImage: `url(${data && data.photo})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center bottom',
            }}
          />
        </li>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <ul key={day}>
        {days}
      </ul>
    );
    days = [];
  }
  return <div className='cells-container'>{rows}</div>;
};

export default RenderCells;
