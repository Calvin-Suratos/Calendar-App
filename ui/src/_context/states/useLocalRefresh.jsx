import { useState } from 'react';

const useLocalRefresh = () => {

  const [ localRefresh, setLocalRefreshBoolean ] = useState(true);

  const setLocalRefresh = (newState) => {
    setLocalRefreshBoolean(newState);
  }

  return { localRefresh, setLocalRefresh };
}

export default useLocalRefresh;
