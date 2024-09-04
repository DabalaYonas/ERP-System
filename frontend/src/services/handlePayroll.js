import axios from "axios";

export const PAYROLL_URL = "http://127.0.0.1:8000/payroll/api/";
export const PAYSLIP_URL = "http://127.0.0.1:8000/payroll/payslip/api/";

export async function getPayrolls() {
    return axios.get(PAYROLL_URL, {withCredentials: true});
}

export async function getPayroll(id) {
    return axios.get(PAYROLL_URL + id + "/", {withCredentials: true});
}

export async function postPayroll(data) {
    return axios.post(PAYROLL_URL, data, {headers: {'content-type': 'multipart/form-data'}, withCredentials: true});
}

export async function putPayroll(data, id) {
    return axios.put(PAYROLL_URL + id + "/", data, {headers: {'content-type': 'multipart/form-data'}, withCredentials: true});
}

export async function deletPayroll(id) {
    return axios.delete(PAYROLL_URL + id + "/", {withCredentials: true});
}

export async function patchPayroll(data, id) {
    return axios.patch(PAYROLL_URL + id + "/", data, {withCredentials: true});
}

export async function getPayslips() {
    return axios.get(PAYSLIP_URL, {withCredentials: true});
}

export async function getPayslip(id) {
    return axios.get(PAYSLIP_URL + id + "/", {withCredentials: true});
}

export async function postPayslip(data) {
    return axios.post(PAYSLIP_URL, data, {headers: {'content-type': 'multipart/form-data'}, withCredentials: true});
}

export async function putPayslip(data, id) {
    return axios.put(PAYSLIP_URL + id + "/", data, {headers: {'content-type': 'multipart/form-data'}, withCredentials: true});
}

export async function deletPayslip(id) {
    return axios.delete(PAYSLIP_URL + id + "/", {withCredentials: true});
}
