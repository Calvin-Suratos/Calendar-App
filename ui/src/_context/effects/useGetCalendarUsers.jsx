import React, { useState } from 'react';
import smartApi from '../../_helpers/smartApi.js'

const useGetCalendarUsers = (setCalendarUsers) => {

  const getCalendarUsers = () => {
    smartApi(['GET', `users`])
      .then(result => setCalendarUsers(result))
  }

  return getCalendarUsers;
}

export default useGetCalendarUsers;