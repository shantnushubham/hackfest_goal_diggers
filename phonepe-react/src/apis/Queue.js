import Axios from "axios";

export const SendQueueApi = async (queue) => {
  return await Axios.post("/queue", queue);
}