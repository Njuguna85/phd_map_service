import EventBus from "@/components/events/EventBus.js";
import { getFromLF } from "../store/storage/localForage";

const baseUrl = import.meta.env.VUE_APP_URL;

const handleHttpError = async (err = "") => {
  let message = "";

  message =
    err === ""
      ? "An error was encountered. Please try again or contact the System Admin."
      : err;
  EventBus.$emit("notify", { message: message, status: "error" });

  return err;
};

const reportSuccess = async (successMsg) => {
  let message = "";
  message = successMsg === "" ? "Successful" : successMsg;
  EventBus.$emit("notify", { message: message, status: "success" });
  return message;
};

const getToken = async () => {
  const tokenData = await getFromLF("token");

  if (!tokenData) return null;

  const { token, exp } = tokenData;

  if (+exp * 1000 <= new Date().getTime()) return null;

  return token;
};

const getTokenExpiry = async () => {
  var { exp } = await getFromLF("token");

  return exp;
};

const getUserDetails = async () => {
  const user = await getFromLF("user");
  if (!user) return null;
  return user;
};

export {
  baseUrl,
  handleHttpError,
  reportSuccess,
  getToken,
  getTokenExpiry,
  getUserDetails,
};
