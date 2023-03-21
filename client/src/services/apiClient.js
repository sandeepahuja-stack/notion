import axios from "axios";

const apiClient = ({ url, headers }) => {
  let requestHeader = { ...headers };

  const axiosInstance = axios.create({
    baseURL: url,
    responseType: "json",
    ...(requestHeader && { headers: requestHeader }),
  });

  return axiosInstance;
};
export default apiClient;
