import HTable from "./src/index";

HTable.install = function(Vue) {
  Vue.component(HTable.name, HTable);
};

export default HTable;
