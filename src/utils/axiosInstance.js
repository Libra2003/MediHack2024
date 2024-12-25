import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://medihack2024.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;