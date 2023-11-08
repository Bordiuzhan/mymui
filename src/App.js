import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { selectIsRefreshing } from './redux/auth/selectors';

// import Dashboard from './components/DashBord';
import SignIn from './components/Signin';
import Layout from './components/Layout';
import Orders from './components/Orders';
import { useEffect } from 'react';
import { refreshUser } from './redux/auth/operations';
import { Box, CircularProgress } from '@mui/material';
import { RestrictedRoute } from './routes/RestrictedRoute';
import { PrivateRoute } from './routes/PrivateRout';
import { Dashboard } from '@mui/icons-material';
import Deposits from './components/Deposits';
import Chart from './components/Chart';
import SignUp from './components/Signup';

function App() {
  const dispatch = useDispatch();

  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
    console.log('refreshUser');
  }, [dispatch]);

  return isRefreshing ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress size={60} />
    </Box>
  ) : (
    <Routes>
      <Route
        path="/signin"
        element={<RestrictedRoute redirectTo="/" component={<SignIn />} />}
      />
      <Route
        path="/signup"
        element={<RestrictedRoute redirectTo="/" component={<SignUp />} />}
      />
      <Route
        path="/"
        element={<PrivateRoute redirectTo="/signin" component={<Layout />} />}
      >
        <Route
          index
          element={
            <PrivateRoute redirectTo="/signin" component={<Dashboard />} />
          }
        />
        <Route
          path="/orders"
          element={<PrivateRoute redirectTo="/signin" component={<Orders />} />}
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute redirectTo="/signin" component={<Deposits />} />
          }
        />
        <Route
          path="/reports"
          element={<PrivateRoute redirectTo="/signin" component={<Chart />} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
