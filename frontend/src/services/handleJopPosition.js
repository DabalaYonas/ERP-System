import API from "./api";

export const URL = "/lookup/api/job-position/";

export async function getJopPositions() {
    return API.get(URL, {withCredentials: true});
}

export async function getJopPosition(id) {
    return API.get(URL + id + "/", {withCredentials: true});
}

export async function postJopPositions(data) {
    return API.post(URL, data, {withCredentials: true});
}
