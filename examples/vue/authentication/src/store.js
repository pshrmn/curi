import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  user: undefined
};

const mutations = {
  login(state) {
    state.user = 'User';
  },
  logout(state) {
    state.user = undefined;
  }
};

export default new Vuex.Store({
  state,
  mutations
});
