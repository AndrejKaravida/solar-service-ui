import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { getToken } from "./authentication";

const SolarAppAxios: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
});

interface ErrorMessage {
  message: string;
}

SolarAppAxios.interceptors.request.use(async function (config) {
  const token = await getToken();
  if (token && config.headers) {
    config.headers.Authorization = token;
  }
  return config;
});

SolarAppAxios.interceptors.response.use(
  (data) => data,
  async (error) => {
    if (error?.response?.status === 401) {
      toast.error("Unauthorized!");
    }

    if (error.response && error.response.data.errors) {
      const { errors }: { errors: ErrorMessage[] } = error.response.data;
      const errorMessages = errors
        ? errors.map((err) => err.message).join(" ")
        : "Server error";

      toast.error(errorMessages);
    } else if (error.request) {
      toast.error("Something went wrong");
    } else {
      toast.error("Error", error.message);
    }
    return;
  }
);

export { SolarAppAxios };
