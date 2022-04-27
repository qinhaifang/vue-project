import Vue from "vue";
import Cookies from "js-cookie";
import Element from "element-ui";

Vue.use(Element, {
  size: Cookies.get("size") || "medium", // set element-ui default size
});
