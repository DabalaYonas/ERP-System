import axios from "axios";

export const URL = "http://127.0.0.1:8000/leave/public-holidays/api/";

export async function getHolidays() {
    return axios.get(URL, {withCredentials: true}).then(response => response.data);
}

export async function getHoliday(id) {
    return axios.get(URL + id + "/", {withCredentials: true}).then(response => response.data);
}

export async function postHolidays(data) {
    return axios.post(URL, data, {withCredentials: true}).then(response => response.data);
}
