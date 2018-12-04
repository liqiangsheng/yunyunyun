import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      obj: "", //vueX初始数据},
  },
  mutations: {
    obj:function (state,data) {
        state.obj = data;
    }
  },
  actions: {
    obj:function (store,data) {
        store.commit("obj",data);
    }
  }
});
