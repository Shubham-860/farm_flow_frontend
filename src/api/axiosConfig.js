import axios from "axios";

const axiosConfig = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json"
    }
})
// REQUEST interceptor (adds token to headers)
axiosConfig.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});


// RESPONSE interceptor (handles expired / invalid token)
axiosConfig.interceptors.response.use(response => response,
    error => {
        const status = error?.response?.status;
        const requestUrl = error?.config?.url || "";
        const isAuthRequest = requestUrl.includes("/auth/login") || requestUrl.includes("/auth/register");

        if (status === 401 && !isAuthRequest) {
            localStorage.removeItem("token");
            if (window.location.pathname !== "/login") {
                window.history.replaceState({}, "", "/login");
                window.dispatchEvent(new PopStateEvent("popstate"));
            }
        }
        return Promise.reject(error);
    })


export default axiosConfig;
