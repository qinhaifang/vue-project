// import Layout from "./home.vue";
// export { Layout };
import Vue from "vue";
import requireComponent from "./components";
import "./libs/element-ui";
import "./style/index.scss";
import fetch from "@/utils/axios";
import filters from "./filters";
import * as notice from "@/utils/notice";
// 全局过滤器
Object.keys(filters).forEach(filterName => {
  Vue.filter(filterName, filters[filterName]);
});
const hlElement = {
  // 必须得有install方法
  install(Vue, options) {
    Vue.prototype.$notice = notice;
    Vue.prototype.$fetch = fetch;
    Object.values(requireComponent).forEach(component => {
      Vue.component(component.name, component);
    });
  }
};
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(hlElement);
}
export default hlElement;
