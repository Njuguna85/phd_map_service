import { login, refreshToken, logout } from "@/helpers/apis/auth.js";

export default {
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("didAutoLogout");
  },

  async logout({ commit }) {
    await logout();
    commit("setCurrentUser", null, { root: true });
  },

  async login() {
    return await login();
  },

  async refreshToken() {
    return await refreshToken();
  },
};
