import axios from "axios";

const BankAccountURL = "http://127.0.0.1:8000/lookup/api/bank-account/";
const DegreeUrl = "http://127.0.0.1:8000/lookup/api/degree/";
const StageUrl = "http://127.0.0.1:8000/lookup/api/stage/";

export const getBankAccounts = async () => {
    return await axios.get(BankAccountURL, {withCredentials: true}).then(response => response.data);
}

export const getDegrees = async () => {
    return await axios.get(DegreeUrl, {withCredentials: true}).then(response => response.data);
}

export const postDegree = async (data) => {
    return await axios.post(DegreeUrl, data, {withCredentials: true}).then(response => response.data);
}

export const getStages = async () => {
    return await axios.get(StageUrl, {withCredentials: true}).then(response => response.data);
}

export const postStage = async (data) => {
    return await axios.post(StageUrl, data, {withCredentials: true}).then(response => response.data);
}