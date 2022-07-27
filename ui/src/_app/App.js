import React, { useEffect, useState} from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import config from '../_config/config'
import './global.css';
import TeamCalendar from '../_components/TeamCalendar/TeamCalendar.jsx';

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


function App() {

  let [users, setUsers] = useState([ ]);


  useEffect(() => {
    
    fetch(ApiUrl + "/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err))
  }, []);

  return (
    <>
      <div>
        <h1 style={{textAlign: 'center'}}>Calendar</h1>
          <TeamCalendar/>
      </div>
      <footer style={{position: 'fixed', bottom: '1vh', left: '0', right: '0', textAlign: 'center'}}>
        {'Copyright © '} 
        {users.map((user, index) => <span style={{color: user.color}} key={user.id}>{`${user.name} `}</span>)}
      </footer>
    </>
  );
}

export default App;
