import axios from "axios";
import API from "./api";

export const getCurrentUser = async() => {
  try {  
    const response = await API.get(`/user/api/`);

    return response.data;
  } catch (error) {
    return null;
  }
}
