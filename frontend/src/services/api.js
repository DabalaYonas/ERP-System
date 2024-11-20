import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await API.post('user/token/refresh/', {
                    refresh: localStorage.getItem('refresh_token'),
                });
                localStorage.setItem('access_token', data.access);
                API.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
                return API(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token expired. Logging out.');
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                delete API.defaults.headers.common['Authorization'];
            }
        }
        return Promise.reject(error);
    }
);

export default API;