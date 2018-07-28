import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
      localStorage.setItem("DearDiiaryToken", JSON.stringify(token));
    },
    setUser({ commit }, user) {
      commit("setUser", user);
      localStorage.setItem("DearDiiaryUser", JSON.stringify(user));
    }
  },
  getters: {
    getUserId: state => {
      return state.user._id;
    },
    getUserToken: state => {
      return state.token;
    }
  }
});
