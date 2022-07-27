import { useState } from 'react';

const useCalendarEvents = () => {

  const [ calendarEvents, setCalendarEventsArray ] = useState([]);

  const setCalendarEvents = (newState) => {
    setCalendarEventsArray(newState);
  }

  return { calendarEvents, setCalendarEvents };
}

export default useCalendarEvents;