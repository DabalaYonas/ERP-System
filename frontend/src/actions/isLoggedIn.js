import {jwtDecode} from 'jwt-decode';

function isLoggedIn(){
  const token = localStorage.getItem('jwtToken');
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export default isLoggedIn;