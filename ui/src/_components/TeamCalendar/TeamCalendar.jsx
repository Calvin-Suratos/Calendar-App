import React, { useState, useEffect, useContext } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from "date-fns/getDay";
import './team-calendar.css';
import smartApi from '../../_helpers/smartApi.js';
import { GlobalContext } from '../../_context/AppProvider';
// import { ReactDialogBox } from 'react-js-dialog-box'

const TeamCalendar = () => {
  const { store } = useContext(GlobalContext);
  const { calendarEvents, getCalendarEvents, userFilter, calendarUsers } = store;
  
  const [ filteredEvents, setFilteredEvents ] = useState([]);

  const locales = {
    "en-US": require("date-fns/locale/en-US")
  }
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  })

  useEffect(() => getCalendarEvents(), []);

  useEffect(() => {
    console.log("refreshing filtered events")
    setFilteredEvents(filterEvents(calendarEvents))
  }, [userFilter.length])

  const filterEvents = (events) => {
    console.log("UserFilter length", userFilter.length);

    if ((userFilter !== undefined && userFilter.length > 0) && (events !== undefined && events.length > 0)) {
      console.log(events.filter(event => userFilter.map(user => user.id === event.users_id)));
      return events.filter(event => userFilter.map(user => user.id === event.users_id));
      // return events.filter(event => userFilter.map(user => user.name).includes(event.name))
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

  const eventDialog = (event) => {
    console.log(event);
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
      {console.log("Filtered Events", filteredEvents)}
      <Calendar 
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{height: "calc(100% - 100px)", width: "calc(100% - 100px)", margin: "50px"}}
        eventPropGetter={(event, start, end, isSelected) => ({
          event,
          start,
          end,
          isSelected,
          style: { backgroundColor: getEventColor(event) },
        })}
        onSelectEvent={(event) => {eventDialog(event)}}/>
    </div>
  )
}

export default TeamCalendar;