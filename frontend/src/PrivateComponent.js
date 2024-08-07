import React from 'react';
import { Navigate } from 'react-router-dom';
import Register from './Register';
import EmployeeRecords from './EmployeeRecords';
import UpdateInfo from './UpdateInfo';

const PrivateComponent = () => {
  const auth = JSON.parse(localStorage.getItem('user'));

  if (!auth || !auth.role) {
    return <Navigate to='/' />;
  }

  // Check the user's role
  switch (auth.role) {
    case 'admin':
      return <EmployeeRecords />;
    case 'employee':
      return <Register />;
    case 'goshala':
      return <UpdateInfo />;
    default:
      return <Navigate to='/' />;
  }
};

export default PrivateComponent;
