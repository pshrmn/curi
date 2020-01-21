import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let state = {
  user: undefined
};

let mutations = {
  login(state) {
    state.user = "User";
  },
  logout(state) {
    state.user = undefined;
  }
};

export default new Vuex.Store({
  state,
  mutations
});
