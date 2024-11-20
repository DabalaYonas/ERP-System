import API from "./api";

export const Url = "/attendance/api/";

export const getAttedances = async () => {
    return await API.get(Url).then(response => response.data);
}

export const postAttedances = async (attendace) => {
    return await API.post(Url, attendace);
}