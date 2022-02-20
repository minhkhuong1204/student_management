import React from 'react';
//import cityApi from 'api/cityApi';
//import studentApi from 'api/studentApi';
import { Route, Switch } from 'react-router-dom';
import LoginPage from 'features/auth/pages/LoginPage';
import { AdminLayout } from 'components/Layout/Admin';
import { NotFound, PrivateRoute } from 'components/Common';

function App() {
  
  
  return (
    <div>
      <Switch>
        <Route path="/login">
          <LoginPage />
          
        </Route>
          <PrivateRoute path="/admin">
            <AdminLayout />
          </PrivateRoute>

        <Route path='*' >
          <NotFound />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
