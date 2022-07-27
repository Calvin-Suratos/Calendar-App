import React, { useState, useEffect, useContext } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from "date-fns/getDay";
import './team-calendar.css';
import smartApi from '../../_helpers/smartApi.js';
import { GlobalContext } from '../../_context/AppProvider';

// import "react-big-calendar/lib/css/react-big-calendar.css";

let users = [
  {id: 1, name: 'Calvin', color: '#4c4db3'},
  {id: 2, name: 'Cybyl', color: '#e8bed5'},
  {id: 3, name: 'Kyle', color: '#d4e51a'},
  {id: 4, name: 'Nehemiah', color: '#30cf86'}
]

const TeamCalendar = () => {
  const { store } = useContext(GlobalContext);
  const { calendarEvents, getCalendarEvents } = store;

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

  return (
    <div className="calendar-container">
      <Calendar 
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{height: "calc(100% - 100px)", width: "calc(100% - 100px)", margin: "50px"}}/>
    </div>
  )
}

export default TeamCalendar;


// const events = [
//   {
//     title: 'Meeting One',
//     allDay: true,
//     start: new Date(2022, 7, 25), // months are zero-indexed
//     end: new Date(2022, 7, 28),
//     description: '',
//     user: 'test'
    
//   },
//   {
//     title: 'Meeting Two',
//     allDay: false,
//     start: new Date(2022, 8, 5),
//     end: new Date(2022, 8, 28),
//     description: 'dentist',
//     user: 'Calvin'
//   }
// ]