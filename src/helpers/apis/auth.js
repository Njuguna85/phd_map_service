import { baseUrl, handleHttpError, reportSuccess, getToken } from "../utils";
import {
  savetoLF,
  removeFromLF,
  getFromLF,
} from "../../store/storage/localForage";

const axios = require("axios").default;

const login = async (payLoad) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      ...payLoad,
    });

    if (!response.data.data) return { error: response.data.error.message };

    const { refresh, access } = response.data.data;

    const { token, exp } = tokenData;

    const userTokens = {
      accessToken: access,
      refreshToken: refresh,
    };

    await removeFromLF("token");

    await savetoLF("token", { token, exp });

    await removeFromLF("user");

    await savetoLF("user", user);

    return { user };
  } catch (err) {
    const error =
      err.response.data.error ||
      "An error occurred Login in.Please try again or Contact the System Admin ";
    return { error: error };
  }
};

const logout = async () => {
  await removeFromLF("token");
  await removeFromLF("user");
};

const fetchCurrentUser = async () => {
  try {
    const user = await getFromLF("user");

    return user;
  } catch (err) {
    handleHttpError("Could not get user");
  }
};

async function tryLogin() {
  try {
    const user = await getFromLF("user");
    const token = await getToken();

    if (user && token) return { user, token };
  } catch (error) {
    return handleHttpError("Could not authenticate User");
  }
}

export { login, logout, fetchCurrentUser, tryLogin };
