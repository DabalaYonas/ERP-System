import API from "./api";

const BankAccountURL = "/lookup/api/bank-account/";
const DegreeUrl = "/lookup/api/degree/";
const StageUrl = "/lookup/api/stage/";

export const getBankAccounts = async () => {
    return await API.get(BankAccountURL, {withCredentials: true}).then(response => response.data);
}

export const getDegrees = async () => {
    return await API.get(DegreeUrl, {withCredentials: true}).then(response => response.data);
}

export const postDegree = async (data) => {
    return await API.post(DegreeUrl, data, {withCredentials: true}).then(response => response.data);
}

export const getStages = async () => {
    return await API.get(StageUrl, {withCredentials: true}).then(response => response.data);
}

export const postStage = async (data) => {
    return await API.post(StageUrl, data, {withCredentials: true}).then(response => response.data);
}