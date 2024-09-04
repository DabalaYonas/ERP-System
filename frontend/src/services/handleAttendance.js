import axios from "axios"

export const Url = "http://127.0.0.1:8000/attendance/api/";

export const getAttedances = async () => {
    return await axios.get(Url, {withCredentials: true}).then(response => response.data);
}

export const postAttedances = async (attendace) => {
    return await axios.post(Url, attendace, {withCredentials: true}).then(response => response.data);
}