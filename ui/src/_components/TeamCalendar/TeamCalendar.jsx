import React, { useState, useEffect, useContext } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from "date-fns/getDay";
import './team-calendar.css';
import smartApi from '../../_helpers/smartApi.js';
import { GlobalContext } from '../../_context/AppProvider';

const TeamCalendar = () => {
  const { store } = useContext(GlobalContext);
  const { calendarEvents, getCalendarEvents, userFilter, calendarUsers } = store;
  const [ filteredEvents, setFilteredEvents ] = useState([]);
  const locales = {"en-US": require("date-fns/locale/en-US")}

  useEffect(() => getCalendarEvents(), []);
  useEffect(() => {
    setFilteredEvents(filterEvents(calendarEvents))
  }, [userFilter.length])
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  })

  const filterEvents = (events) => {
    if ((userFilter !== undefined && userFilter.length > 0) && (events !== undefined && events.length > 0)) {
      return events.filter(event => userFilter.map(user => user.id === event.users_id));
    }
    return events;
  }

  const getEventUserName = (event) => {
    let eventUserId = event.users_id;
    let userIndex = calendarUsers.findIndex(user => user.id === eventUserId);
    return calendarUsers[userIndex].name;
  }

  const getEventColor = (event) => {
    let eventUserId = event.users_id;
    let userIndex = calendarUsers.findIndex(user => user.id === eventUserId);
    return calendarUsers[userIndex].color;
  }

  const eventDetailsPopup = (event) => {
    alert(`
      Title: ${event.name}\n
      Description: ${event.description}\n
      Start: ${event.start}\n
      End: ${event.end}\n
      User: ${getEventUserName(event)}
    `);
    return
  }

  return (
    <div className="calendar-container">
      <Calendar 
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{height: "calc(100% - 100px)", width: "calc(100% - 100px)", margin: "50px"}}
        onSelectEvent={(event) => {eventDetailsPopup(event)}}
        eventPropGetter={(event, start, end, isSelected) => ({
          event,
          start,
          end,
          isSelected,
          style: { backgroundColor: getEventColor(event)},
        })}
        />
    </div>
  )
}

export default TeamCalendar;