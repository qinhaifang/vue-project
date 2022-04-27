import Vue from "vue";
import Vuex from "vuex";
if (process.env.NODE_ENV === "development") {
  Vue.use(Vuex);
}

import permission from "./modules/permission";
import menu from "./modules/menu";
import user from "./modules/user";
export default new Vuex.Store({
  modules: {
    permission,
    menu,
    user
  }
});
