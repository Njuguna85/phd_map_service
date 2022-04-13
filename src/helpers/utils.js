import EventBus from "@/components/events/EventBus.js";
import { getFromLF } from "../store/storage/localForage";

const baseUrl = import.meta.env.VITE_APP_URL;
const userEmail = import.meta.env.VITE_APP_EMAIL;
const userPassword = import.meta.env.VITE_APP_PASSWORD;
const userCode = import.meta.env.VITE_APP_CODE;

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
  const accessTOken = await getFromLF("access");

  if (!accessTOken) return null;

  return accessTOken;
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
  userCode,
  userEmail,
  userPassword,
  handleHttpError,
  reportSuccess,
  getToken,
  getTokenExpiry,
  getUserDetails,
};
