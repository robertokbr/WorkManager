import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import TeamUsers from '../pages/TeamUsers';
import CreateUsers from '../pages/CreateUsers';

const Routes: React.FC = () => (
  <Switch>
    <Route component={SignIn} path="/" exact />
    <Route component={SignUp} path="/signup" />
    <Route component={Dashboard} path="/dashboard" isPrivate />
    <Route component={TeamUsers} path="/teamUsers" isPrivate />
    <Route component={CreateUsers} path="/createTeam" isPrivate />
  </Switch>
);
export default Routes;
