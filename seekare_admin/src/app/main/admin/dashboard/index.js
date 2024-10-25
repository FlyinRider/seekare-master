import React from 'react';

import { DashboardContextProvider } from 'app/context/admin/dashboard';
import Dashboard from './dashboard';

const AdminDashboard = () => {
  return (
    <DashboardContextProvider>
      <Dashboard />
    </DashboardContextProvider>
  );
};

export default AdminDashboard;
