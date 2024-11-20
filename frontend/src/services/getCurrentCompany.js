import { getCurrentUser } from "../services/getCurrentUser";
import API from "./api";

export const getCurrentCompany = async() => {
    const user = await getCurrentUser();
    return await API.get(`/company/api/${user.company.id}/`).then(response => (response.data)).catch(error => (error));
}
