import axios from "axios";

export const URL = "http://127.0.0.1:8000/lookup/api/department/";

export async function getDepartments() {
    return axios.get(URL).then(response => response.data);
}

export async function postDepartments(data) {
    return axios.post(URL, data).then(response => response.data);
}
