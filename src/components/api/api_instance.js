import axios from "axios";


export const axiosInstance = axios.create({
  baseURL: 'http://localhost:1338/api/',
  headers: {
    "Content-Type": "application/json",
    timeout: 100000,
  },
});

const headerInterceptor = (request) => {
  console.log("Interseptor request", request.url)
  const token = localStorage.getItem('jwt')
  if (request.url !== '/auth/local') {
    request.headers.Authorization = `Bearer ${token}`
  }
  console.log("reques header for the ", request);
  return request
}


export const resetAxiosInterceptors = () => {
  axiosInstance.interceptors.request.eject(headerInterceptor);
}

export const configureAxiosInterceptors = () => {

  if (localStorage.getItem("jwt") == null) {
    return;
  }

  const token = localStorage.getItem('jwt');

  axiosInstance.interceptors.request.use(headerInterceptor)

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      console.log("asdsa",error.response.status)
    }
  );
}