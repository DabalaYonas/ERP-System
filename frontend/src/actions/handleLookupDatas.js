import axios from "axios";

const DegreeUrl = "http://127.0.0.1:8000/lookup/api/degree/";
const StageUrl = "http://127.0.0.1:8000/lookup/api/stage/";

export const getDegrees = async () => {
    return await axios.get(DegreeUrl).then(response => response.data);
}

export const postDegree = async (data) => {
    return await axios.post(DegreeUrl, data).then(response => response.data);
}

export const getStages = async () => {
    return await axios.get(StageUrl).then(response => response.data);
}

export const postStage = async (data) => {
    return await axios.post(StageUrl, data).then(response => response.data);
}