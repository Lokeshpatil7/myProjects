import Axios from "axios";

const API_URL = "";

const headers = {
  "Content-Type": "application/json",
};

const uploadImage = () => {
  return Axios.post(API_URL + "/", {
    headers,
  });
};

const apiService = {
  uploadImage,
};

export default apiService;
