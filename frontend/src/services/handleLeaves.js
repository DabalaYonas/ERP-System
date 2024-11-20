import API from "./api";

export const URL = "/leave/api/public-holidays/";

export async function getHolidays() {
    return API.get(URL).then(response => response.data);
}

export async function getHoliday(id) {
    return API.get(URL + id + "/").then(response => response.data);
}

export async function postHolidays(data) {
    return API.post(URL, data).then(response => response.data);
}
