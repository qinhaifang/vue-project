import HEarth from "./src/index";

HEarth.install = function(Vue) {
  Vue.component(HEarth.name, HEarth);
};

export default HEarth;
