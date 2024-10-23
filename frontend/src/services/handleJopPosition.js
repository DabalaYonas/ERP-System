import axios from "axios";

export const URL = "http://127.0.0.1:8000/lookup/api/job-position/";

export async function getJopPositions() {
    return axios.get(URL, {withCredentials: true});
}

export async function getJopPosition(id) {
    return axios.get(URL + id + "/", {withCredentials: true});
}

export async function postJopPositions(data) {
    return axios.post(URL, data, {withCredentials: true});
}
