import axios from "axios"; 

const axiosInstance = axios.create({
  baseURL : 'http://localhost:1337/api/',
  headers: {
//  Authorization: `<Your Auth Token>`,
    "Content-Type": "application/json",
    timeout : 100000,
  }, 
  // .. other options
});

export default axiosInstance;