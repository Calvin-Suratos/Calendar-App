import { useState } from 'react';

const useSelectedUser = () => {
  const [ selectedUser, setSelectedUserObject ] = useState({});

  const setSelectedUser = (newState) => {
    setSelectedUserObject(newState);
  }

  return { selectedUser, setSelectedUser };
}

export default useSelectedUser;