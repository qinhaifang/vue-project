<!--
 * @Author: haifang.qin
 * @Date: 2023-08-04 09:56:40
 * @LastEditors: haifang.qin
 * @LastEditTime: 2023-09-04 09:25:05
 * @FilePath: \computer-integrated-projectd:\userQin\vue-project\src\view\line\index.vue
-->
<template>
  <div>
    <H-title title="接线图"></H-title>
    <div class="drawAdd">
      <div class="left">1</div>
      <div class="right">
        <draw-add></draw-add>
      </div>
    </div>
  </div>
</template>
<script>
import drawAdd from "./component/drawAdd.vue";
import { mapState } from "vuex";
export default {
  name: "line",
  components: {
    drawAdd
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["drawhandle", "drawChange"])
  },
  watch: {
    drawhandle() {
      console.log(2222, ...mapState);
      var width = document.getElementById("draw").clientWidth;
      // document
      //   .getElementById("draw")
      //   .getElementsByTagName("canvas")[0].style.width = width + "px";
      // setTimeout(function() {
      //   canvas.fitView();
      //   // canvas.canvasPos = canvas.divLayer.canvas.getBoundingClientRect();
      // }, 500);
    }
  },
  mounted() {
    // this.$refs.drawoption.init();
  }
};
</script>
<style lang="scss" scoped>
.drawAdd {
  display: flex;
  .left {
    width: 200px;
  }
  .right {
    flex: 1;
  }
}
</style>
