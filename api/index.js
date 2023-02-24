import axios from "axios";
import { fb_getIdToken } from "../firebase-service";
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ORIGIN_NATIVE, // <- ENV variable
});
apiClient.interceptors.request.use(async (config) => {
  config.headers.token = await fb_getIdToken();
  return config;
},
  error => Promise.reject(error),
);

apiClient.interceptors.response.use((response) =>
  response,
  async (error) => {
    // ...
    console.log(error);
    //return Promise.reject(error.response.data);
  },
);

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };