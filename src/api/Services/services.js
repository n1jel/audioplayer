import api from "../Manager/manager";
import { endpoints } from "../Services/endpoints";

export const login = async (email, password, fcm_token) => {
  return api.post(endpoints.login, { email, password, fcm_token });
};
