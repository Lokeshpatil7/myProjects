import axios from "axios";

const axiosIns = axios.create({
  baseURL: "http://18.142.134.212:3000/api/v1", //process.env.REACT_APP_BASE_URL,
  timeout: 1000000,
  //headers: {'X-Custom-Header': 'foobar'}
});

// Add a request interceptor
axiosIns.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (config.url !== "/authentications/user/login/") {
      config.headers.Authorization = `Bearer ${sessionStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosIns.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { axiosIns };
