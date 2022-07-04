<!--
 * @Author: haifang.qin
 * @Date: 2022-04-01 11:36:36
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-06-06 14:30:02
 * @FilePath: \vue-project\src\global\layout\index.vue
-->
<template>
  <div class="home rflex">
    <left-menu></left-menu>
    <div class="menuRight wflex el-scrollbar" :style="{ left: 250 + 'px' }">
      <head-nav></head-nav>
      <bread></bread>
      <div class="content">
        <router-view></router-view
        ><!--页面渲染入口-->
      </div>
    </div>
  </div>
</template>
<script>
import LeftMenu from "./components/leftMenu.vue";
import HeadNav from "./components/headNav.vue";
import Bread from "./components/bread.vue";
export default {
  components: { LeftMenu, HeadNav, Bread }
};
</script>
<style lang="scss" scoped>
.home {
  .menuRight {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f6f7fc;
    .content {
      position: relative;
      height: calc(100vh - 120px);
      overflow: auto;
      margin: 0px 30px;
      border-radius: 4px;
      padding: 20px;
      background: #fff;
      box-shadow: 0 4px 8px 0 rgb(71 121 236 / 12%);
    }
  }
}
</style>
