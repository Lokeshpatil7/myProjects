import jwt from "jsonwebtoken";

export const isAuth = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return false;

  var decodedToken = jwt.decode(token, { complete: true });
  var dateNow = new Date();

  return decodedToken.payload.exp < dateNow.getTime();
};
