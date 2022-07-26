import React, { useEffect, useState} from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
import config from '../_config/config'

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

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

const events = [
  {
    title: 'Meeting One',
    allDay: true,
    start: new Date(2022, 7, 25),
    end: new Date(2022, 7, 28)
  },
  {
    title: 'Meeting Two',
    allDay: false,
    start: new Date(2022, 8, 5),
    end: new Date(2022, 8, 28)
  }
]
// new Date(year, monthIndex, day, hours, minutes)

function App() {

  let [names, setNames] = useState([ ]);

  useEffect(() => {
    fetch(ApiUrl + "/authors")
      .then(response => response.json())
      .then(data => setNames(data))
      .catch(err => console.log(err))
  }, []);


  return (
    <div>
      App is running - good work: 
      { names.filter(author => author.firstName == 'Eric').map(author => author.firstName + " ")}

      <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{height: 500, margin: "50px"}}/>
    </div>
  );
}

export default App;
