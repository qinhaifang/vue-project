// import Layout from "./home.vue";
// export { Layout };
import Vue from "vue";
import "./components";
import "./libs/element-ui";
import "./style/index.scss";
import filters from "./filters";
// 全局过滤器
Object.keys(filters).forEach(filterName => {
  Vue.filter(filterName, filters[filterName]);
});
