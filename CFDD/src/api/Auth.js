import { post } from "./HTTPService";

export class AuthService {
  static login = (queryData = {}, config = {}) => {
    return post("/users/login/", queryData, config);
  };

  static logout = (queryData = {}, config = {}) => {
    return post("/users/login/", queryData, config);
  };
}
