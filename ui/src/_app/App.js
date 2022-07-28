import React, { useEffect, useState, useContext } from 'react';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import config from '../_config/config'
import './global.css';
import TeamCalendar from '../_components/TeamCalendar/TeamCalendar.jsx';
import { GlobalContext } from '../_context/AppProvider';
import smartApi from '../_helpers/smartApi';
import { Icon, SvgIcon } from '@mui/material';
import SquareIcon from '@mui/icons-material/Square';
import './App.css';
import Paper from '@mui/material/Paper';
import NewEvent from '../_components/NewEvent/NewEvent';
import UserSelect from '../_components/UserSelect/UserSelect';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

function App() {
  const { store } = useContext(GlobalContext);
  const { calendarUsers, getCalendarUsers, userFilter } = store;
  
  useEffect(() => {
    getCalendarUsers();
  }, []);

  return (
    <>
      <Paper sx={{margin: '8px', padding: '4px', backgroundColor: 'rgba(95, 158, 160, 0.8)', boxShadow: '0 0 4px 0.2px black', textAlign:'center', fontVariant: 'small-caps'}}><h1>Calendar</h1></Paper>
      <Paper sx={{margin: '8px', padding: '4px', backgroundColor: 'rgba(95, 158, 160, 0.3)', boxShadow: '0 0 4px 0.2px black', textAlign: 'center', fontVariant: 'small-caps'}}><NewEvent/></Paper>
      <div style={{display: 'flex', justifyContent: 'center', padding: '5%'}}>
        <TeamCalendar/>
        <div className='legendDiv'>
          <h3 className='legend'>Legend</h3>
          {calendarUsers.map((user, index) => <div key={user.id}><SquareIcon style={{color: user.color}}/>{user.name}</div>)}
          <h3>View Events By User</h3>
          <UserSelect/>
        </div>
      </div>
      <footer>
        {'Copyright © '} 
        {console.log(calendarUsers)}
        {calendarUsers === undefined ? <></> :
          calendarUsers.map((user, index) => <span style={{color: user.color}} key={user.id}>{user.name}</span>)}
      </footer>
    </>
  );
}

export default App;
