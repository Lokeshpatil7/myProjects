import { axiosIns } from "./Axios";

const get = (url, queryData = {}, config) => {
  return axiosIns
    .get(url, { params: queryData, ...(config || {}), timeout: 1000000 })
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const post = (url, queryData, config) => {
  return axiosIns
    .post(url, queryData, config)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const put = (url, queryData) => {
  return axiosIns
    .put(url, queryData)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const patch = (url, queryData) => {
  return axiosIns
    .patch(url, queryData)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const httpDelete = (url, queryData) => {
  return axiosIns
    .delete(url, queryData)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { get, post, put, patch, httpDelete };
