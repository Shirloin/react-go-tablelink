import axiosModule from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const httpClient = axiosModule.create({
  baseURL: API_URL,
});

httpClient.defaults.headers.common['Content-Type'] = 'application/json';

export default httpClient;

