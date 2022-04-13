import Vue from "vue";
import Vuex from "vuex";

import authModule from "./modules/auth";
import linesModule from "./modules/lines";

import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
  },
  getters,
  mutations,
  actions,
  modules: {
    auth: authModule,
    lines: linesModule,
  },
});
