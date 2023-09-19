<!--
 * @Author: haifang.qin
 * @Date: 2023-02-02 17:24:28
 * @LastEditors: haifang.qin
 * @LastEditTime: 2023-02-03 14:24:21
 * @FilePath: \vue-project\src\view\upload\index.vue
-->
<template>
  <div>
    <upload-img></upload-img>
    <!-- <vue-player></vue-player> -->
  </div>
</template>
<script>
import UploadImg from "./component/uploadImg.vue";
import VuePlayer from "./component/vuePlayer.vue";
export default {
  components: { UploadImg, VuePlayer },
  data() {
    return {};
  },
  methods: {}
};
</script>
