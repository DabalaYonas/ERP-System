import axios from "axios";

export const URL = "http://127.0.0.1:8000/lookup/api/job-position/";

export async function getJopPositions() {
    return axios.get(URL).then(response => response.data);
}

export async function postJopPositions(data) {
    return axios.post(URL, data).then(response => response.data);
}
