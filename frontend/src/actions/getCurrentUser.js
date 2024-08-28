import axios from "axios";

export const getCurrentUser = async() => {
  try {
    const token = localStorage.getItem("jwtToken");     
    const response = await axios.get(`http://127.0.0.1:8000/user/api/`,
      {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, withCredentials: true});

    return response.data;
  } catch (error) {
    return null;
  }
}
