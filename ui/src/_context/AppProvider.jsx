import React, { createContext } from 'react';
import useCalendarEvents from './states/useCalendarEvents';
import useCalendarUsers from './states/useCalendarUsers';
import useGetCalendarEvents from './effects/useGetCalendarEvents';

const GlobalContext = createContext()

const AppProvider = ({ children }) => {
  const { calendarEvents, setCalendarEvents } = useCalendarEvents();
  const { calendarUsers, setCalendarUsers } = useCalendarUsers();
  const getCalendarEvents = useGetCalendarEvents(setCalendarEvents);

  const store = {

    /* STATES */
    calendarEvents,
    calendarUsers,

    /* SETTERS */
    setCalendarEvents,
    setCalendarUsers,
    
    /* EFFECTS */
    getCalendarEvents,

    /* REFS */

  }


  return (
    <GlobalContext.Provider value={{ store }}>
      { children }
    </GlobalContext.Provider>
  )
}

export { GlobalContext, AppProvider };