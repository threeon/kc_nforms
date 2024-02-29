import Vue from 'vue';
import Vuex from 'vuex';
import Constant from './store_constant.js';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //user: [{ user_id: "", user_name: "", user_level: ""}],
    user: null,
    login_flag: false,
    accessToken: null,
    depth1_menus: [],
    depth2_menus: [],
    depth3_menus: [],
    screen_menus: [],
  },
  getters: {
    LOGIN_INFO: state => {
      return state.user;
    }
  },
  mutations: {
    //[Constant.ADD_USER]: (state, payload) => {
    //  state.user.user_id = payload.user_id;
    //  state.user.user_name = payload.user_name;
    //  state.user.user_level = payload.user_level;
    //},
    //[Constant.DELETE_USER]: (state) => {
    //  state.user.user_id = "";
    //  state.user.user_name = "";
    //  state.user.user_level = "";
    //},
    [Constant.ADD_DEPTH1_MENU]: (state, payload) => {
      state.depth1_menus = payload;
    },
    [Constant.ADD_DEPTH2_MENU]: (state, payload) => {
      state.depth2_menus = payload;
    },
    [Constant.ADD_DEPTH3_MENU]: (state, payload) => {
      state.depth3_menus = payload;
    },
    [Constant.ADD_SCREEN_MENU]: (state, payload) => {
      state.screen_menus = payload;
    },

    SET_USER: (state, payload) => {
      state.user = payload;
    },
    REMOVE_USER: (state) => {
      state.user = null;
    },
    [Constant.ADD_SCREEN_MENU]: (state, payload) => {
      state.screen_menus = payload;
    },
    LOGIN_FLAG: (state, payload) => {
      state.login_flag = payload;
    },
    LOGIN: (state, { accessToken }) => {
      state.accessToken = accessToken;
    },
    LOGOUT: (state) => {
      state.accessToken = null;
    },
  },
  actions: {
    
  },
});

export default store;