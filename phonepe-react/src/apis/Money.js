import Axios from "axios";

export const GetBalanceApi = async () => {
  return await Axios.get("/balance");
};

export const AddPCashApi = async (pin, amount) => {
  return await Axios.post("/pcash", { pin, amount });
};
