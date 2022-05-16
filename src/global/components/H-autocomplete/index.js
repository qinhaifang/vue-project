import HAutocomplete from "./src/index.vue";

/* istanbul ignore next */
HAutocomplete.install = function(Vue) {
  Vue.component(HAutocomplete.name, HAutocomplete);
};

export default HAutocomplete;
