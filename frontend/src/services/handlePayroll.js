import API from "./api";

export const PAYROLL_URL = "/payroll/api/";
export const PAYSLIP_URL = "/payroll/payslip/api/";

export async function getPayrolls() {
    return API.get(PAYROLL_URL, {withCredentials: true});
}

export async function getPayroll(id) {
    return API.get(PAYROLL_URL + id + "/", {withCredentials: true});
}

export async function postPayroll(data) {
    return API.post(PAYROLL_URL, data, {headers: {'content-type': 'multipart/form-data'}, withCredentials: true});
}

export async function putPayroll(data, id) {
    return API.put(PAYROLL_URL + id + "/", data, {headers: {'content-type': 'multipart/form-data'}, withCredentials: true});
}

export async function deletPayroll(id) {
    return API.delete(PAYROLL_URL + id + "/", {withCredentials: true});
}

export async function patchPayroll(data, id) {
    return API.patch(PAYROLL_URL + id + "/", data, {withCredentials: true});
}

export async function getPayslips() {
    return API.get(PAYSLIP_URL, {withCredentials: true});
}

export async function getPayslip(id) {
    return API.get(PAYSLIP_URL + id + "/", {withCredentials: true});
}

export async function postPayslip(data) {
    return API.post(PAYSLIP_URL, data, {headers: {'content-type': 'multipart/form-data'}, withCredentials: true});
}

export async function putPayslip(data, id) {
    return API.put(PAYSLIP_URL + id + "/", data, {headers: {'content-type': 'multipart/form-data'}, withCredentials: true});
}

export async function deletPayslip(id) {
    return API.delete(PAYSLIP_URL + id + "/", {withCredentials: true});
}
