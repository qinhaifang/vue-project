// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/";
import "@/global";
import hlElement from "./global";
import "./../static/elementuiFont/icon.css";
import "./assets/css/drawfont.css";

import ElementUI from "element-ui";
Vue.use(ElementUI, { size: "mini" });
import("element-ui/lib/theme-chalk/index.css");

import Carousel3d from "vue-carousel-3d";
Vue.use(Carousel3d);

// 图片裁剪
import VueCropper from "vue-cropper";
Vue.use(VueCropper);

// 视频播放

import VueVideoPlayer from "vue-video-player";
// import "video.js/dist/video-js.css";
Vue.use(VueVideoPlayer);

import "@/permission"; // permission control
import "@/mockjs"; // mock数据

const configBase = require("@/config/config.base");
// Vue.prototype.$bkConfig = Object.assign({}, configBase);
// Vue.use(permission);
Vue.use(hlElement);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
