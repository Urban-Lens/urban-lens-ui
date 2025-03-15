import Axios from "axios";
import { BASE_URL } from "../config/environment";
import storage from "./storage";
import { toast } from "sonner";

export const axios = Axios.create({
    baseURL: BASE_URL,
});

axios.interceptors.request.use(
    (config) => {
        const token = storage.getToken();

        if (token) {
            config.headers!["Authorization"] = "Bearer " + token;
            config.headers!["Content-Type"] = "application/json";
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if it's a 401 error and a token exists
        if (error.response && error.response.status === 401) {
            const token = storage.getToken();
            if (token) {
                storage.removeToken();
                window.location.replace("/login");
                toast.info("Please Log in");
            }
        }
        return Promise.reject(error);
    }
);
