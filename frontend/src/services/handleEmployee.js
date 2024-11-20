import { message } from "antd";
import API from "./api";

export const URL = "/employee/api/";

export async function getEmployees() {
    return API.get(URL, {withCredentials: true});
}

export async function getEmployee(id) {
    return API.get(URL + id + "/", {withCredentials: true}).then(response => response.data).catch(error => error);
}

export async function postEmployees(data) {
    return API.post(URL, data, {headers: {'content-type': 'multipart/form-data'}, withCredentials: true}).then(response => {
        message.success("Employee created seccussfully!");
        return response.data;
    }).catch(error => {
        message.error("Sorry! Can't create this employee!");
        console.error(error);
        return null;
    });
}

export async function putEmployee(data, id) {
    return API.put(URL + id + "/", data, {headers: {'content-type': 'multipart/form-data'}, withCredentials: true}).then(response => {
        message.success("Employee updated seccussfully!");
        return response.data;
    }).catch(error => {
        message.error("Sorry! Can't updated this employee!");
        console.error(error);
        return null;
    });
}

export async function deletEmployee(id) {
    return API.delete(URL + id + "/", {withCredentials: true});
}
