import Axios from "axios";

export const SignUpUserApi = async (user) => {
  return await Axios.post("/signup", user);
};

export const LoginApi = async (username, password) => {
  return await Axios.post("/login", { username, password });
};
