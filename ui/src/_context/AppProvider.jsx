import React, { createContext } from 'react';
import useCalendarEvents from './states/useCalendarEvents';
import useCalendarUsers from './states/useCalendarUsers';
import useSelectedUser from './states/useSelectedUser';
import useUserFilter from './states/useUserFilter';
import useGetCalendarEvents from './effects/useGetCalendarEvents';
import useGetCalendarUsers from './effects/useGetCalendarUsers';

const GlobalContext = createContext()

const AppProvider = ({ children }) => {
  const { calendarEvents, setCalendarEvents } = useCalendarEvents();
  const { calendarUsers, setCalendarUsers } = useCalendarUsers();
  const { selectedUser, setSelectedUser } = useSelectedUser();
  const { userFilter, setUserFilter } = useUserFilter();
  const getCalendarEvents = useGetCalendarEvents(setCalendarEvents);
  const getCalendarUsers = useGetCalendarUsers(setCalendarUsers);

  const store = {

    /* STATES */
    calendarEvents,
    calendarUsers,
    selectedUser,
    userFilter,

    /* SETTERS */
    setCalendarEvents,
    setCalendarUsers,
    setSelectedUser,
    setUserFilter,
    
    /* EFFECTS */
    getCalendarEvents,
    getCalendarUsers,

    /* REFS */

  }


  return (
    <GlobalContext.Provider value={{ store }}>
      { children }
    </GlobalContext.Provider>
  )
}

export { GlobalContext, AppProvider };