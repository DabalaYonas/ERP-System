import { Navigate } from 'react-router-dom';
import isLoggedIn from './isLoggedIn';

function LoginRequired({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

export default LoginRequired;