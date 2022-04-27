<!--
 * @Author: haifang.qin
 * @Date: 2022-04-01 11:59:07
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-04-02 15:19:21
 * @FilePath: \vue-project\src\layout\components\headNav.vue
-->
<template>
  <header class="head-nav rflex" id="header_container">
    <div class="right-nav">
      <top-menu></top-menu>
    </div>
  </header>
</template>
<script>
import TopMenu from "./header/topMenu.vue";
export default {
  components: { TopMenu }
};
</script>
<style lang="scss" scoped>
.head-nav {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 29;
  transition: width 0.2s;
  justify-content: space-between;
  height: 60px;
  box-sizing: border-box;
  background: #fff;
}
</style>
