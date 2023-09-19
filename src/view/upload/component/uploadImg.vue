<!--
 * @Author: haifang.qin
 * @Date: 2023-02-03 14:18:54
 * @LastEditors: haifang.qin
 * @LastEditTime: 2023-02-13 10:17:54
 * @FilePath: \vue-project\src\view\upload\component\uploadImg.vue
-->
<!-- @description：图片上传组件 -->
<template>
  <div>
    <el-upload
      action=""
      drag
      list-type="picture-card"
      accept=".jpg, .jpeg, .png, .gif,.MOV,.avi"
      :before-upload="beforeUpload"
    >
      <img
        :src="imageBase64 || require(`../../../assets/errorImg/404.png`)"
        class="avatar"
      />
      <div class="shade">
        <i class="el-icon-delete clear-img" @click.stop="clearImg"></i>
        <p>更改头像</p>
      </div>
    </el-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    beforeUpload(file) {
      console.log(111, file);
    }
  }
};
</script>
