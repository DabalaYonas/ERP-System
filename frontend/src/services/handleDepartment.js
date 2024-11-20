import API from "./api";

export const URL = "/lookup/api/department/";

export async function getDepartments() {
    return API.get(URL, {withCredentials: true});
}

export async function getDepartment(id) {
    return API.get(URL + id + "/", {withCredentials: true}).then(response => response.data);
}

export async function postDepartments(data) {
    return API.post(URL, data, {withCredentials: true}).then(response => response.data);
}
