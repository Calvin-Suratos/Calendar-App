import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import smartApi from "../../_helpers/smartApi";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { GlobalContext } from '../../_context/AppProvider';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewEvent = () => {
  const [ isOpen, setIsOpen ] = useState(false); 
  const [ open, setOpen ] = useState(false);

  const [startValue, setStartValue] = useState(new Date());
  const [endValue, setEndValue] = useState(new Date());

  const { store } = useContext(GlobalContext);
  const { getCalendarUsers, calendarUsers } = store;

  const [userID, setUserID] = useState(0);

  const handleUserChange = (event) => {
    setUserID(event.target.value);
  };

  const handleStartChange = (newValue) => {
    setStartValue(newValue);
  };

  const handleEndChange = (newValue) => {
    setEndValue(newValue);
  };
  
  const handleInput = async (e) => {
    
    const newEvent = {    
      "name" : document.getElementById("subject-text").value,
      "start_date" :  new Date(startValue.getFullYear(), startValue.getMonth(), startValue.getDate(), startValue.getHours(), startValue.getMinutes()), 
      "end_date" :  new Date(endValue.getFullYear(), endValue.getMonth(), endValue.getDate(), endValue.getHours(), endValue.getMinutes()), 
      "description" :  document.getElementById("description-text").value, 
      "users_id" : userID,    
    }

    smartApi(['POST', `newuserevents`, newEvent]).then(result => console.log(result));  
    
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    window.location.reload(false);
    setOpen(false);
  };

  useEffect(() => getCalendarUsers(), []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {isOpen ? 
        <div>
          <h3 >New Event</h3>
          <TextField id="subject-text" label="Subject"/>
          <DateTimePicker
          id="startdate-text"
          label="Start Date"
          value={startValue}
          onChange={handleStartChange}
          renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
          id="enddate-text"
          label="End Date"
          value={endValue}
          onChange={handleEndChange}
          renderInput={(params) => <TextField {...params} />}
          />
          <TextField id="description-text" label="Description"/>


          <FormControl sx={{width: 250}}>
            <InputLabel id="demo-simple-select-label">Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userID}
              label="Age"
              onChange={handleUserChange}
            >
              {calendarUsers.map(user => <MenuItem value={user.id} key={user.id}>{user.name}</MenuItem>)}
            </Select>
          </FormControl>

          <div><Button onClick={(e) => handleInput(e)}>Add Event</Button></div>
          <Snackbar open={open} autoHideDuration={10000} onClick={handleClose}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Event has been added!
          </Alert>
          </Snackbar>
          <Button><ClearIcon onClick = {() => setIsOpen(false)}/></Button>
        </div>
      :
        <div>
        <h3>New Event</h3>
        <Button><AddIcon onClick={() => setIsOpen(true)}/></Button>
        </div>
      }
    </LocalizationProvider>
  )
}

export default NewEvent;