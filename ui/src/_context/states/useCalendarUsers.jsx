import { useState } from 'react';

const useCalendarUsers = () => {

  const [ calendarUsers, setCalendarUsersArray ] = useState([]);

  const setCalendarUsers = (newState) => {
    setCalendarUsersArray(newState);
  }

  return { calendarUsers, setCalendarUsers };
}

export default useCalendarUsers;