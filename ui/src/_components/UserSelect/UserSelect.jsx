import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../_context/AppProvider';
import './user-select.css';

const UserSelect = () => {
  const { store } = useContext(GlobalContext);
  const { calendarUsers, selectedUser, setSelectedUser, userFilter, setUserFilter } = store;
  const [ localRefresh, setLocalRefresh ] = useState(false);

  const addUserToFilter = (user) => {
    let tempArray = userFilter;
    tempArray.push(user);
    setUserFilter(tempArray);
  }

  const removeUserFromFilter = (userIndex) => {
    let tempArray = userFilter;
    tempArray.splice(userIndex, 1);
    setUserFilter(tempArray)
  }

  const filterHandler = (userToFilter) => {
    let userIndex = userFilter.findIndex(user => user.id === userToFilter.id);
    userIndex === -1 ? addUserToFilter(userToFilter) : removeUserFromFilter(userIndex);
    setLocalRefresh(!localRefresh);
  }

  const isUserFiltered = (userToCheck) => {
    if (userFilter !== undefined) {
      return userFilter.filter(user => user.id === userToCheck.id).length > 0;
    }
    return false;
  }

  return (
    <div className="user-filter-container">
      {calendarUsers.map(user => {
        return (
        <div key={user.id} className="user-filter-entry" style={{backgroundColor: `${user.color}`}}
          onClick={() => {filterHandler(user)}}>
          {isUserFiltered(user) ? 
            <input className="user-checkbox" type="checkbox" checked={true} onChange={() => {}} disabled/>
            :
            <input className="user-checkbox" type="checkbox" checked={false} onChange={() => {}} disabled/>
          }
          {/* <input className="user-checkbox" type="checkbox" checked={`${isUserFiltered(user)}`}/> */}
          <span className="user-name">{user.name}</span>
        </div>
        )
      })}
    </div>
  )
}

export default UserSelect;