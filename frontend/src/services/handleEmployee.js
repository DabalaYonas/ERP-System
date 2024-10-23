import { message } from "antd";
import axios from "axios";

export const URL = "http://127.0.0.1:8000/employee/api/";

export async function getEmployees() {
    return axios.get(URL, {withCredentials: true});
}

export async function getEmployee(id) {
    return axios.get(URL + id + "/", {withCredentials: true}).then(response => response.data).catch(error => error);
}

export async function postEmployees(data) {
    return axios.post(URL, data, {headers: {'content-type': 'multipart/form-data'}, withCredentials: true}).then(response => {
        message.success("Employee created seccussfully!");
        return response.data;
    }).catch(error => {
        message.error("Sorry! Can't create this employee!");
        console.error(error);
        return null;
    });
}

export async function putEmployee(data, id) {
    return axios.put(URL + id + "/", data, {headers: {'content-type': 'multipart/form-data'}, withCredentials: true}).then(response => {
        message.success("Employee updated seccussfully!");
        return response.data;
    }).catch(error => {
        message.error("Sorry! Can't updated this employee!");
        console.error(error);
        return null;
    });
}

export async function deletEmployee(id) {
    return axios.delete(URL + id + "/", {withCredentials: true});
}
