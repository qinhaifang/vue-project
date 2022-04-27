<!--
 * @Author: haifang.qin
 * @Date: 2022-04-01 11:50:32
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-04-02 15:21:55
 * @FilePath: \vue-project\src\layout\components\leftMenu.vue
-->
<template>
  <div class="menuLeft cflex">
    <div class="logo rflex">logo</div>
    <div class="menu_page_bottom is-scroll-left">
      <el-menu
        :unique-opened="false"
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
      >
        <template v-for="(item, index) in permission_routers">
          <router-link
            v-if="!item.hidden && item.noDropdown"
            :to="item.path + '/' + item.children[0].path"
            :key="index"
          >
            <el-menu-item class="dropItem">
              <!-- <icon-svg v-if="item.meta.icon" :icon-class="item.meta.icon" /> -->
              <span v-if="item.meta.title" slot="title">{{
                item.meta.title
              }}</span>
            </el-menu-item>
          </router-link>

          <el-submenu
            v-if="
              item.children &&
                item.children.length >= 1 &&
                !item.hidden &&
                !item.noDropdown
            "
            :index="item.path"
            :key="index"
          >
            <template slot="title">
              <span v-if="item.meta.title" slot="title">{{
                item.meta.title
              }}</span>
            </template>
            <!--直接定位到子路由上，子路由也可以实现导航功能-->
            <router-link
              v-for="(citem, cindex) in item.children"
              :to="getIndex(citem, item, cindex)"
              :key="cindex"
            >
              <el-menu-item
                v-if="citem.meta.routerType != 'topmenu' && citem.meta.title"
                :index="getIndex(citem, item, cindex)"
              >
                <span slot="title"> {{ citem.meta.title }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import variables from "@/global/style/variables.scss";
export default {
  name: "leftMenu",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["permission_routers", "isCollapse", "sidebar", "menuIndex"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.routerParentUrl) return meta.routerParentUrl;
      else {
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      }
    },
    variables() {
      return variables;
    }
  },
  created() {},
  mounted() {},
  methods: {
    getIndex(citem, item, cindex) {
      return item.path + "/" + citem.path;
    }
  }
};
</script>
<style lang="scss" scoped>
.menuLeft {
  width: 250px;
  background: #01ad83;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  .logo {
    width: 100%;
    height: 60px;
    align-items: center;
    justify-content: space-around;
    text-transform: uppercase;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0px 2px 5px 0px rgba(230, 224, 224, 0.5);
  }
}
</style>
