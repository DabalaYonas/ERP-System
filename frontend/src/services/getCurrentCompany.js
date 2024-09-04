import axios from "axios";
import { getCurrentUser } from "../services/getCurrentUser";

export const getCurrentCompany = async() => {
    const user = await getCurrentUser();

    const COMPANY_URL = "http://127.0.0.1:8000/company/api/";
    return await axios.get(`${COMPANY_URL}${user.id}/`, {withCredentials: true}).then(response => (response.data)).catch(error => (error));
}
