import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const instance = axios.create({
    baseURL: `${API_URL}`
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error !== null && error !== 'undefined' && typeof error !== 'undefined' && error.hasOwnProperty("response")) {
        if (error.response !== null && error.response !== 'undefined' && typeof error.response !== 'undefined' && error.response.hasOwnProperty("status") && error.response.status === 401 && window.location.pathname !== "/login") {
            localStorage.removeItem("expirationDate");
            localStorage.removeItem("token");
            window.location.reload(false);
        }
    }
    return Promise.reject(error);
});

export default instance;