<!--
 * @Author: haifang.qin
 * @Date: 2023-08-04 17:30:06
 * @LastEditors: haifang.qin
 * @LastEditTime: 2023-09-14 10:55:48
 * @FilePath: \vue-project\src\view\line\component\drawAdd.vue
-->
<template>
  <div class="drawadd ltee">
    <drawoption ref="drawoption" :nodeprops.sync="props"></drawoption>
    <div class="draw-content">
      <div class="content-nav">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="icon-yuanjian"></i> 元件</span>
            <el-menu
              :unique-opened="true"
              default-active="1"
              class="el-menu-vertical-demo"
            >
              <el-submenu
                :index="index + '1'"
                v-for="(item, index) in cell"
                :key="index"
                >{{ item }}
                <template slot="title">
                  <i class="icon-shezhi"></i>
                  <span>{{ item.submenu }}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="(children, childrenindex) in item.children"
                    :index="index + '1' + '-' + childrenindex + '1'"
                    :key="childrenindex"
                    :title="children.title"
                  >
                    <i
                      :class="children.iconname + ' ' + children.iconFamily"
                      :style="children.style"
                      draggable="true"
                      @dragstart="onDrag($event, children)"
                    ></i>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="icon-moban"></i> 模板</span>
            <el-menu
              :unique-opened="true"
              @open="menuSelect"
              default-active="1"
              class="el-menu-vertical-demo"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="icon-shezhi"></i>
                  <span>系统模板</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="item in systemMould"
                    :key="item.id"
                    :title="item.name"
                  >
                    <span
                      v-hasPermi="['ema:cdc:remove']"
                      class="deleteButton"
                      @click="deleteCdc(item.id, 1)"
                      >+</span
                    >
                    <img
                      @dragend="mouldDrag(item)"
                      :src="item.picPath"
                      alt=""
                    />
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="icon-shezhi"></i>
                  <span>单位模板</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="item in userMould"
                    :key="item.id"
                    :title="item.name"
                  >
                    <span
                      v-hasPermi="['ema:cdc:remove']"
                      class="deleteButton"
                      @click="deleteCdc(item.id, 2)"
                      >+</span
                    >
                    <img
                      @dragend="mouldDrag(item)"
                      :src="item.picPath"
                      alt=""
                    />
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="drawing">
        <div id="draw"></div>
        <div class="powerName">
          {{ powerName }}
        </div>
        <div class="scaleNum">
          <span class="scale">
            {{ Math.floor(canvas ? canvas.data.scale * 100 : 0) }}%</span
          >
          <i @click="fulldraw" class="iconfont icon-fangda"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var canvas, scaleDom;
// import { Topology, registerNode } from "@topology/core";
import drawoption from "./drawOption";
import cell from "../js/drawCell";
export default {
  components: {
    drawoption
  },
  data() {
    return {
      props: {
        // 属性修改
        node: null,
        line: null,
        nodes: null,
        multi: false,
        expand: false,
        locked: false
      },
      cell: cell,
      //系统模板的图片列表
      systemMould: [],
      //用户模板的图片列表
      userMould: [],
      //配电室的名字
      powerName: "",
      rect: {
        width: 50,
        height: 50
      }
    };
  },
  watch: {
    drawhandle() {
      var width = document.getElementById("draw").clientWidth;
      document
        .getElementById("draw")
        .getElementsByTagName("canvas")[0].style.width = width + "px";
      setTimeout(function() {
        canvas.fitView();
        canvas.canvasPos = canvas.divLayer.canvas.getBoundingClientRect();
      }, 500);
    }
  },
  mounted() {
    scaleDom = document.querySelector(".scale");
    document.querySelector(".drawing").onfullscreenchange = () => {
      if (!document.fullscreenElement) {
        canvas.lock(0);
      }
      this.$nextTick(() => {
        setTimeout(() => {
          canvas.canvasPos = canvas.divLayer.canvas.getBoundingClientRect();
        }, 500);
      });
    };
    // this.drawhandle();
    // this.initDarw();
  },
  methods: {
    initDarw() {
      this.$nextTick(() => {
        this.drawTime();
        var self = this;
        canvas = new Topology("draw", {
          on: self.onMessage,
          color: "#ffffff",
          activeColor: "yellow",
          // hoverColor: "#ffffff",
          fontColor: "#ffffff",
          minScale: 0.06
          // translateKey: "m"
        });
        var divsHtml = document
          .getElementById("draw")
          .getElementsByTagName("div");
        var divs = Array.prototype.slice.call(divsHtml);
        divs.forEach(i => {
          if (i.attributes["tabindex"]) {
            contextmenuel = i;
            i.oncontextmenu = () => {
              if (!document.fullscreen) {
                // this.props.node.data
                if (this.props.node) {
                  switch (this.props.node.name) {
                    case "text":
                      this.linkModal = true;
                      this.$refs.linkmodal.init();
                      break;
                    case "image":
                      this.iconType();
                      break;
                    case "ltee":
                      this.iconType();
                      break;
                  }
                }
              }

              return false;
            };
          }
        });
        this.draw();
      });
    },
    onDrag(e, children) {
      if (!("rect" in children.data)) {
        children.data["rect"] = this.rect;
      }
      children.data["fontSize"] = 20;
      children.data["font"] = {
        fontSize: 20
      };
      e.dataTransfer.setData("Topology", JSON.stringify(children.data));
    },
    //模板的删除
    deleteCdc(id, active) {
      this.$msgbox({
        title: "",
        customClass: "iconmes",
        message: "将删除当前模板",
        showCancelButton: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "error",
        iconClass: "iconfont icon-huishou",
        closeOnClickModal: false,
        closeOnPressEscape: false
      })
        .then(() => {
          drawServe.DELETE_CDC(id).then(e => {
            if (e.code == 200) {
              this.menuSelect(active);
            }
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 模板的选择
    menuSelect(index) {
      var params = {
        componentType: index
      };
      if (index == 2) {
        params["orgId"] = JSON.parse(sessionStorage.getItem("userInfo")).orgId;
      } else {
        params["orgId"] = 0;
      }
      drawServe.GET_CDC_LIST(params).then(e => {
        if (index == 1) {
          this.systemMould = e.rows;
        } else {
          this.userMould = e.rows;
        }
      });
    },
    //放大接线图
    fulldraw() {
      if (!document.fullscreenElement) {
        document.querySelector(".drawing").requestFullscreen();
        canvas.lock(1);
      } else {
        document.exitFullscreen();
        canvas.lock(0);
      }
    }
  }
};
</script>
<style lang="scss">
@import url("https://at.alicdn.com/t/font_2071185_9a0dnmbwrpv.css");
.drawadd {
  width: 100%;
  height: 100%;
  .draw-content {
    width: 100%;
    height: calc(100% - 100px);
    font-size: 0;
    .content-nav {
      display: inline-block;
      width: 190px;
      height: 100%;
      i {
        font-family: "iconfont";
        font-size: 16px;
        color: white;
      }
      .el-tabs--border-card {
        height: 100%;
        box-shadow: none;
        border: none;
        background-color: #4878c8 !important;
        .el-tabs__header {
          position: relative;

          &::after {
            position: absolute;
            width: 100%;
            height: 0px;
            content: "";
            border-bottom: 1px solid #5a84d4;
            bottom: -1px;
            left: 0;
          }
          background-color: #4878c8;
          border: none;
          .el-tabs__nav {
            border-bottom: 1px solid #416db4;
            .el-tabs__item {
              width: 95px;
              height: 38px;
              line-height: 38px;
              padding: 0;
              text-align: center;
              background-color: #4878c8;
              border: none;
              color: white;
              &.is-active {
                border: none;
                background-color: #2a58b4;
              }
            }
          }
        }
        .el-tabs__content {
          overflow-y: scroll;
          padding: 0;
          .el-menu {
            border: none;
            background: #2a58b4 !important;
            .el-submenu {
              .el-submenu__title {
                background-color: #2a58b4 !important;
                border-bottom: 1px solid #416db4;
                position: relative;
                &::after {
                  position: absolute;
                  width: 100%;
                  height: 0px;
                  content: "";
                  border-bottom: 1px solid #5a84d4;
                  bottom: -2px;
                  left: 0;
                }
                &:hover {
                  background-color: #3466cc;
                }
                i {
                  color: white;
                }
                span {
                  color: #e6e6e6;
                }
              }
              .el-menu {
                .el-menu-item-group {
                  .el-menu-item-group__title {
                    display: none;
                  }
                  ul {
                    font-size: 0;
                    li {
                      padding: 0 !important;
                      position: relative;
                      min-width: 0;
                      width: 33.33%;
                      text-align: center;
                      color: white;
                      display: inline-block;
                      .deleteButton {
                        display: none;
                        content: "+";
                        position: absolute;
                        color: white;
                        font-size: 18px;
                        transform: rotate(45deg);
                        top: -3px;
                        right: -4px;
                        width: auto;
                        height: auto;
                        line-height: 14px;
                      }
                      &:hover {
                        .deleteButton {
                          display: block;
                        }
                        background-color: #4878c8;
                      }
                      &:focus {
                        background-color: #4878c8;
                      }
                      img {
                        width: 90%;
                        height: 90%;
                        border: 1px solid white;
                      }
                      // &::after {
                      //   position: absolute;
                      //   width: 100%;
                      //   height: 0px;
                      //   content: "";
                      //   border-bottom: 1px solid #5a84d4;
                      //   bottom: -2px;
                      //   left: 0;
                      // }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .drawing {
      vertical-align: top;
      display: inline-block;
      width: calc(100% - 190px);
      height: 100%;
      position: relative;
      #draw {
        height: 100%;
        width: 100%;
        font-size: 14px;
        overflow: hidden !important;
        // background-color: black;
      }
      .powerName {
        position: absolute;
        right: 10px;
        top: 10px;
        color: white;
        font-size: 12px;
        z-index: 10;
      }
      .scaleNum {
        position: absolute;
        right: 10px;
        bottom: 30px;
        color: white;
        font-size: 12px;
        z-index: 10;
      }
    }
  }
}
// el-select-dropdown el-popper
::v-deep .el-dialog__wrapper {
  .el-dialog {
    .el-dialog__body {
      padding: 0 10px;
      .select {
        color: white;
        .el-select,
        .el-cascader {
          margin-bottom: 10px;
          .el-input {
            .el-input__inner {
              height: 30px;
              line-height: 30px;
            }
          }
          .el-input__icon {
            line-height: 30px;
          }
        }
      }
      .option {
        margin-bottom: 10px;
        .el-button {
          font-size: 10px;
          padding: 3px 20px;
        }
      }
      .el-table {
        margin-bottom: 10px;
        .cell {
          .el-select {
            margin-bottom: 10px;
            .el-input {
              .el-input__inner {
                height: 20px;
                line-height: 20px;
              }
            }
            .el-input__icon {
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
