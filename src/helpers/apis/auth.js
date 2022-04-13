import {
  baseUrl,
  userCode,
  userEmail,
  userPassword,
  handleHttpError,
  reportSuccess,
} from "../utils";

import {
  savetoLF,
  removeFromLF,
  getFromLF,
} from "../../store/storage/localForage";

import axios from "axios";

const login = async () => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login/`, {
      email: userEmail,
      password: userPassword,
      code: userCode,
    });

    if (!response.data) {
      handleHttpError(response.data.error.message);
      return false;
    }

    const { refresh, access } = response.data;

    await removeFromLF("refresh");
    await removeFromLF("access");

    await savetoLF("refresh", refresh);
    await savetoLF("access", access);

    return true;
  } catch (err) {
    const error =
      err.response.data.error ||
      "An error occurred Login in.Please try again or Contact the System Admin ";
    handleHttpError(error);
    return false;
  }
};

const refreshToken = async () => {
  const refresh = await getFromLF("refresh");

  try {
    const response = await axios.post(`${baseUrl}/auth/login/refresh/`, {
      refresh,
    });

    if (!response.data) {
      handleHttpError(response.data.error.message);
      return false;
    }

    await removeFromLF("access");

    const { access } = response.data;

    await savetoLF("access", access);

    return true;
  } catch (err) {
    const error =
      err.response.data.error ||
      "An error occurred refreshing token.Please try again or Contact the System Admin ";
    handleHttpError(error);
    return false;
  }
};

const logout = async () => {
  await removeFromLF("token");
};

export { login, refreshToken, logout };
