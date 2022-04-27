<template>
  <div class="hlcx-title">
    <el-tooltip
      class="item"
      effect="dark"
      :open-delay="500"
      :content="title"
      placement="top-start"
    >
      <span class="title">{{ title }}</span>
    </el-tooltip>
    <div class="operate">
      <slot name="operate"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "hlcx-title",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.hlcx-title {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  min-height: 25px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  span.title {
    display: inline-block;
    line-height: 25px;
    font-size: 20px;
    color: #65789b;
    letter-spacing: 0;
    font-family: fangzhenglanting;
  }
  div.operate {
    display: inline-block;
    line-height: 25px;
  }
}
</style>
