import { useState } from 'react';

const useUserFilter = () => {
  const [ userFilter, setUserFilterArray ] = useState([]);

  const setUserFilter = (newState) => {
    setUserFilterArray(newState);
  }

  return { userFilter, setUserFilter };
}

export default useUserFilter;