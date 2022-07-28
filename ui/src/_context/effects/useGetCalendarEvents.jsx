import React, { useState } from 'react';
import smartApi from '../../_helpers/smartApi.js'

const useGetCalendarEvents = (setCalendarEvents) => {

  const parseDatetime = (datetimeString) => {
    let date = datetimeString.split("T")[0].split("-");
    let time = datetimeString.split("T")[1].split(":");

    let year = parseInt(date[0]);
    let month = parseInt(date[1]) - 1;
    let day = parseInt(date[2]);

    let hour = parseInt(time[0]);
    let minutes = parseInt(time[1]);

    return new Date(year, month, day, hour, minutes);
  } // new Date(year, monthIndex, day, hours, minutes)

  const getCalendarEvents = () => {
    smartApi(['GET', `events`])
      .then(result => {
        if (result === undefined) throw(new Error);
        result.map(event => {
          event.title = event.name
          event.start = parseDatetime(event.start_date)
          event.end = parseDatetime(event.end_date);
        })

        setCalendarEvents(result)
      })
      .catch(err => console.log(err));
  }

  return getCalendarEvents;
}

export default useGetCalendarEvents