import axios from "axios"

const Url = "http://127.0.0.1:8000/recruitment/api/";
const ApplicationUrl = "http://127.0.0.1:8000/recruitment/application/api/";
const ApplicantUrl = "http://127.0.0.1:8000/recruitment/applicant/api/";

export const getRecruitments = async() => {
    return await axios.get(Url, {withCredentials: true}).then(response => response.data);
}

export const getRecruitment = async(id) => {
    return await axios.get(Url + id + "/", {withCredentials: true}).then(response => response.data);
}

export const postRecruitment = async(data) => {
    return await axios.post(Url, data, {withCredentials: true}).then(response => response.data);
}

export const getApplications = async() => {
    return await axios.get(ApplicationUrl, {withCredentials: true}).then(response => response.data);
}

export const getApplication = async(id) => {
    try {
        return await axios.get(ApplicationUrl + id + "/", {withCredentials: true}).then(response => response.data);
    } catch (error) {
        return false;
    }
}

export const postApplication = async(data) => {
    return await axios.post(ApplicationUrl, data, {withCredentials: true}).then(response => response.data);
}

export const putApplication = async(id, data) => {
    return await axios.put(ApplicationUrl + id + "/", data, {withCredentials: true}).then(response => response.data);
}

export const patchApplication = async(id, data) => {
    return await axios.patch(ApplicationUrl + id + "/", data, {withCredentials: true}).then(response => response.data);
}

export const getApplicants = async() => {
    return await axios.get(ApplicantUrl, {withCredentials: true}).then(response => response.data);
}

export const postApplicant = async(data) => {
    return await axios.post(ApplicantUrl, data, {withCredentials: true}).then(response => response.data);
}

export const putApplicant = async(id, data) => {
    return await axios.put(ApplicantUrl + id + "/", data, {withCredentials: true}).then(response => response.data);
}
