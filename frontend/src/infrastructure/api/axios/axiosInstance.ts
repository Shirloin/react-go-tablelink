import axiosModule from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axiosModule.create({
  baseURL: API_URL,
});

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

export default axiosInstance;

