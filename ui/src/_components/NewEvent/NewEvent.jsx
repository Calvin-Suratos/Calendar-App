import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import smartApi from "../../_helpers/smartApi";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewEvent = () => {
  const [ isOpen, setIsOpen ] = useState(false); 
  const [ open, setOpen ] = useState(false);

  const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  
  const handleInput = (e) => {
    setOpen(true)

    console.log("Start: ", document.getElementById("startdate-text").value)
    console.log("End: ", document.getElementById("enddate-text").value)

    const newEvent = {
      
      "name" : document.getElementById("subject-text").value,
      "start_date" :  new Date(2022, 9, 22, 8, 30 ), 
      "end_date" :  new Date(2022, 9, 22, 10, 30 ), 
      "description" :  document.getElementById("description-text").value, 
      "users_id" : 1, 
      
    }

    // setIsOpen(false)
    smartApi(['POST', `newuserevents`, newEvent]).then(result => {console.log(result)});
    window.location.reload(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {isOpen ? 
        <div>
          <h3 >New Event</h3>
          <TextField id="subject-text" label="Subject"/>
          <DateTimePicker
          id="startdate-text"
          label="Start Date"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
          id="enddate-text"
          label="End Date"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          />
          <TextField id="description-text" label="Description"/>
          <TextField id="name-text" label="Name"/>
          <div><Button onClick={(e) => handleInput(e)}>Add Event</Button></div>
            <Snackbar open={open} autoHideDuration={1000} onClick={handleClose}>
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
    </>
  )
}

export default NewEvent;