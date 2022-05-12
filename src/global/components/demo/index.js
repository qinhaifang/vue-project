import HDate from "./src/index";

HDate.install = function(Vue) {
  Vue.component(HDate.name, HDate);
};

export default HDate;
