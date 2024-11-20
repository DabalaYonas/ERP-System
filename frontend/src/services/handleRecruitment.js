import API from "./api";

const Url = "/recruitment/api/";
const ApplicationUrl = "/recruitment/application/api/";
const ApplicantUrl = "/recruitment/applicant/api/";

export const getRecruitments = async() => {
    return await API.get(Url, {withCredentials: true}).then(response => response.data);
}

export const getRecruitment = async(id) => {
    return await API.get(Url + id + "/", {withCredentials: true}).then(response => response.data);
}

export const postRecruitment = async(data) => {
    return await API.post(Url, data, {withCredentials: true}).then(response => response.data);
}

export const getApplications = async() => {
    return await API.get(ApplicationUrl, {withCredentials: true}).then(response => response.data);
}

export const getApplication = async(id) => {
    try {
        return await API.get(ApplicationUrl + id + "/", {withCredentials: true}).then(response => response.data);
    } catch (error) {
        return false;
    }
}

export const postApplication = async(data) => {
    return await API.post(ApplicationUrl, data, {withCredentials: true}).then(response => response.data);
}

export const putApplication = async(id, data) => {
    return await API.put(ApplicationUrl + id + "/", data, {withCredentials: true}).then(response => response.data);
}

export const patchApplication = async(id, data) => {
    return await API.patch(ApplicationUrl + id + "/", data, {withCredentials: true}).then(response => response.data);
}

export const getApplicants = async() => {
    return await API.get(ApplicantUrl, {withCredentials: true}).then(response => response.data);
}

export const postApplicant = async(data) => {
    return await API.post(ApplicantUrl, data, {withCredentials: true}).then(response => response.data);
}

export const putApplicant = async(id, data) => {
    return await API.put(ApplicantUrl + id + "/", data, {withCredentials: true}).then(response => response.data);
}
