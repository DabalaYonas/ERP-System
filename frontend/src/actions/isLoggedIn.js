import {jwtDecode} from 'jwt-decode';

function isLoggedIn(){
  const token = localStorage.getItem('access_token');
  return token;
};

export default isLoggedIn;