// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/";
import "@/global";

import ElementUI from "element-ui";
Vue.use(ElementUI, { size: "mini" });
import("element-ui/lib/theme-chalk/index.css");
import "@/permission"; // permission control
import "@/mockjs"; // mock数据

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});