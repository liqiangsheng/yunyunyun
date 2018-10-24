import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters';
import columns from './modules/columns';
import jurisCoach from './modules/jurisCoach';
import education from './modules/education';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    columns,
    jurisCoach,
    education
  },
  getters
});

export default store
