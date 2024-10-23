import axios from "axios";

export const URL = "http://127.0.0.1:8000/lookup/api/department/";

export async function getDepartments() {
    return axios.get(URL, {withCredentials: true});
}

export async function getDepartment(id) {
    return axios.get(URL + id + "/", {withCredentials: true}).then(response => response.data);
}

export async function postDepartments(data) {
    return axios.post(URL, data, {withCredentials: true}).then(response => response.data);
}
