<!--
 * @Author: haifang.qin
 * @Date: 2022-07-12 16:49:53
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-07-13 18:05:10
 * @FilePath: \vue-project\src\view\lunbo\index.vue
-->
<template>
  <div class="box">
    <H-title title="轮播图"></H-title>
    <carousel-3d
      :autoplay="true"
      :autoplayTimeout="3000"
      :perspective="35"
      :display="5"
      :animationSpeed="1000"
      :width="300"
      :height="270"
      controlsVisible
      :controlsHeight="60"
    >
      <slide v-for="(item, i) in slides" :index="i" :key="i">
        <div class="cardBg" :style="{ 'background-image': `url(${item.src})` }">
          {{ item.title }}
        </div>
      </slide>
    </carousel-3d>
    <H-title title="3D旋转"></H-title>
    <div class="box3d">
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
      <div class="item">5</div>
      <div class="item">6</div>
      <div class="item">7</div>
    </div>
  </div>
</template>
<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
/* eslint-disable */
export default {
  components: {
    Carousel3d,
    Slide
  },
  data() {
    return {
      slides: [
        {
          title: "parent",
          slide: 23424234234234,
          src: require("../../assets/lunbo/monitorCenter1.png")
          //   src: "../../assets/lunbo/monitorCenter1.png"
        },
        {
          title: "parent",
          slide: 23424234234234,
          src: require("../../assets/lunbo/monitorCenter2.png")
        },
        {
          title: "parent",
          slide: 23424234234234,
          src: require("../../assets/lunbo/monitorCenter4.png")
        },
        {
          title: "parent",
          slide: 23424234234234,
          src: require("../../assets/lunbo/monitorCenter3.png")
        },
        {
          title: "parent",
          slide: 23424234234234,
          src: require("../../assets/lunbo/monitorCenter3.png")
        }
      ]
    };
  },
  methods: {
    imgClick(data, obj) {
      console.log(data, obj);
    }
  }
};
</script>

<style lang="scss">
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.cardBg {
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
}
.el-carousel__item:nth-child(2n) {
  /* background-color: #99a9bf; */
}

.el-carousel__item:nth-child(2n + 1) {
  /* background-color: #d3dce6; */
}
.box3d {
  position: relative;
  height: 200px;
  width: 200px;
  margin: 200px auto;
  // border: 1px solid red;
  transform-style: preserve-3d;
  transform: rotateX(30deg);
  animation: move 30s linear infinite;
  .item {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 100px;
    line-height: 100px;
    opacity: 0.5;
    text-align: center;
    color: red;
    font-size: 30px;
    border: 1px solid blue;
  }
  .item:nth-child(1) {
    background: royalblue;
    transform: rotateY(60deg) translateZ(400px);
  }
  .item:nth-child(2) {
    background: salmon;
    transform: rotateY(120deg) translateZ(400px);
  }
  .item:nth-child(3) {
    background: slateblue;
    transform: rotateY(180deg) translateZ(400px);
  }
  .item:nth-child(4) {
    background: springgreen;
    transform: rotateY(240deg) translateZ(400px);
  }
  .item:nth-child(5) {
    background: pink;
    transform: rotateY(300deg) translateZ(400px);
  }
  .item:nth-child(6) {
    background: purple;
    transform: rotateY(360deg) translateZ(400px);
  }
}
@keyframes move {
  0% {
    transform: rotateX(-20deg) rotateY(360deg);
  }
  100% {
    transform: rotateX(-20deg) rotateY(0);
  }
}
</style>
