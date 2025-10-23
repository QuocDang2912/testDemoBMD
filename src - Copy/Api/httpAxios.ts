import axios from "axios";
import { UrlApi } from "./config";

const httpAxios = axios.create({
    baseURL: UrlApi,
    headers: { 
        namespace: "anhquoc",
        lang: "vi"
     },
});

// Thêm interceptor cho response
httpAxios.interceptors.response.use(
    (response) => {
        return response.data; // Trả về chỉ dữ liệu từ phản hồi
    },
    (error) => {
        return Promise.reject(error); // Trả về lỗi nếu có lỗi xảy ra trong phản hồi
    }
);

// Thêm interceptor cho request để thêm token vào header
httpAxios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.token = `${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default httpAxios;
