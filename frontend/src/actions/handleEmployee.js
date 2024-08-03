import axios from "axios";

export const URL = "http://127.0.0.1:8000/employee/api/";

export async function getEmployees() {
    return axios.get(URL).then(response => response.data);
}

export async function postEmployees(data) {
    return axios.post(URL, data, {headers: {'content-type': 'multipart/form-data'}}).then(response => response.data);
}
