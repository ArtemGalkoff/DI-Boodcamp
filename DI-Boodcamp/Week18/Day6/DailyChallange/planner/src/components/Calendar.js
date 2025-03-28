import React from 'react';

const Calendar = ({ selectedDate, onDateChange }) => {
  return (
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => onDateChange(e.target.value)}
    />
  );
};

export default Calendar;