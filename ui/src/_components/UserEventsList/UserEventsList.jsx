import React, {useState, useEffect} from 'react'
import config from '../../_config/config'

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const UserEventsList = (userid) => {
    // When a user is clicked display a list of events
    // beneath the calendar
    const [eventsList, setEventsList] = useState([])

    useEffect(() => {
        fetch(`${ApiUrl}/userevents/${userid}`)
        .then((res) => res.json())
        .then((data) => setEventsList(data))
    })

    return (
        <ul>
            {eventsList.map(event => (
                <li key={event.eventname}>
                    {event.eventname}
                </li>
            ))}
        </ul>
    )
}

export default UserEventsList;