import axios from "axios";
import type { LoginFormData, RegisterFormData, UserInfo } from "../types/authTypes";

const BASE_URL = "http://localhost:8080";

export const authApi = {
  login: async (data: LoginFormData): Promise<UserInfo> => {
    const res = await axios.get<UserInfo[]>(`${BASE_URL}/users`, {
      params: {
        email: data.email,
        password: data.password,
      },
    });

    if (res.data.length === 0) {
      throw {
        response: {
          data: { message: "Email or password is incorrect" },
        },
      };
    }

    return res.data[0];
  },

  register: async (data: RegisterFormData): Promise<UserInfo> => {
    const res = await axios.post<UserInfo>(`${BASE_URL}/users`, data);
    return res.data;
  },
};
