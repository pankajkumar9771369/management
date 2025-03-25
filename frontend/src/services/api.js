import axios from "axios";

const API_URL = "http://localhost:5000"; 

const api = axios.create({
    baseURL: API_URL,
});




api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(` Sending request to: ${config.url}`, config);
    } else {
        console.log(" No token found in localStorage");
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});




api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(" API Error:", error.response?.data || error.message);
        if (error.response?.status === 401) {
            console.log(" Unauthorized: Logging out...");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;



// Request interceptor for adding token

export const authAPI = {
    login: async (email, password) => {
        const response = await api.post('/login', { email, password });
        return response.data;
    },
    signup: async (name, email, password) => {
        const response = await api.post('/signup', { name, email, password });
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

