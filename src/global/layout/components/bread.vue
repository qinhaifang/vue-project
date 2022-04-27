<!--
 * @Author: haifang.qin
 * @Date: 2022-04-01 12:00:29
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-04-02 15:35:20
 * @FilePath: \vue-project\src\layout\components\bread.vue
-->
<template>
  <div class="bread">
    <span @click="handleLefeMenu" class="bars">
      收缩按钮
      <svg-icon
        icon-class="iconmenu-fold"
        :class="{ isactive: changeBarDirection }"
      />
    </span>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in matchedArr"
        :key="index"
        :to="{ path: item.path }"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      changeBarDirection: false
    };
  },
  computed: {
    matchedArr() {
      let temp = [],
        temps = [];
      this.$route.matched.filter((item, index, self) => {
        if (item.meta.title) {
          const title = item.meta.title;
          const path = item.path;
          temp.push({ name: title, path: path });
        }
        // if (item.name) {
        //   const name = item.name;
        //   temp.push(name);
        // }
      });
      temp.filter((item, index, self) => {
        if (!temps.includes(item)) {
          temps.push(item);
        }
      });
      return temps;
    }
  },
  methods: {
    handleLefeMenu() {
      this.$store.dispatch("setLeftCollapse"); // 折叠菜单
      this.$store.dispatch("handleLeftMenu"); // 改变菜单宽度 180->35/35-180
      this.changeBarDirection = !this.changeBarDirection;
    }
  }
};
</script>
<style lang="scss" scoped>
.bread {
  position: relative;
  margin-top: 60px;
  padding: 4px 30px;
  width: 100%;
}
</style>
