import './render-header.modules.scss';
import React from 'react';
import { format } from 'date-fns';
import { Icon } from '@iconify/react';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className='header-container'>
      <div className='left'>
        <Icon icon='bi:arrow-left-circle-fill' onClick={prevMonth} />
      </div>
      <div className='month-container'>
        <span className='month'>{format(currentMonth, 'MMM')} </span>
        <span className='year'>{format(currentMonth, 'yyyy')} </span>
      </div>
      <div className='right'>
        <Icon icon='bi:arrow-right-circle-fill' onClick={nextMonth} />
      </div>
    </div>
  );
};

export default RenderHeader;
