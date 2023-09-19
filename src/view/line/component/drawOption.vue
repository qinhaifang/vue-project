<!--
 * @Author: haifang.qin
 * @Date: 2023-08-04 17:30:06
 * @LastEditors: haifang.qin
 * @LastEditTime: 2023-09-14 10:24:48
 * @FilePath: \vue-project\src\view\line\component\drawOption.vue
-->
<template>
  <ul class="draw-header">
    <li class="fatherli">
      <ul class="action operation">
        <li @click="menuOption('draft')">
          <i class="icon-xinjian"></i>
          <p>存为草稿</p>
        </li>
        <li @click="menuOption('save')">
          <i class="icon-baocun"></i>
          <p>提交</p>
        </li>
        <li @click="menuOption('template')" class="btn-none">
          <i class="icon-wenjian"></i>
          <p>存为模板</p>
        </li>
        <li @click="menuOption('export')">
          <i class="icon-daochu"></i>
          <p>导出</p>
        </li>
        <!-- <li @click="menuOption('print')">
          <i class="icon-dayin"></i>
          <p>打印</p>
        </li> -->
      </ul>
      <div class="introduce">操作</div>
    </li>
    <li class="fatherli">
      <ul class="action behavior">
        <li title="全屏" @click="fullpage">
          <i class="icon-fangda"></i>
          <p>全屏</p>
        </li>
        <li title="撤销" @click="menuOption('undo')">
          <i class="icon-huitui"></i>
          <p>撤销</p>
        </li>
        <!-- <li><i class="icon-qianjin"></i></li> -->
        <li title="删除" @click="menuOption('delete')">
          <i class="icon-huishou nomargin"></i>
          <p>删除</p>
        </li>
        <br />
        <!-- <li class="top"><i class=" icon-iconfontxuanzefangfa01"></i></li> -->
        <!-- <li><i class="icon-shou"></i></li> -->
        <li title="复制" @click="menuOption('copy')" class="top">
          <i class="icon-fuzhi"></i>
          <p>复制</p>
        </li>
        <li title="粘贴" @click="menuOption('paste')" class="nomargin">
          <i class="icon-niantie "></i>
          <p>粘贴</p>
        </li>
      </ul>
      <div class="introduce">行为</div>
    </li>
    <li class="fatherli">
      <ul class="action font">
        <!-- settingFont -->
        <li title="图标颜色" class="fontColor">
          <el-color-picker
            :disabled="disabledFlag()"
            @change="iconColor"
            v-model="iconcolor"
          ></el-color-picker>
        </li>
        <li title="字体大小" class="fontSize">
          <el-select
            @change="sizeChage"
            v-model="fontSize"
            placeholder="字体大小"
          >
            <el-option value="10"> </el-option>
            <el-option value="12"> </el-option>
            <el-option value="14"> </el-option>
            <el-option value="16"> </el-option>
            <el-option value="18"> </el-option>
            <el-option value="20"> </el-option>
          </el-select>
        </li>
        <li title="字体颜色" class="fontColor">
          <el-color-picker
            @change="fontcolorChage"
            v-model="fontcolor"
          ></el-color-picker>
        </li>
        <br />
        <li title="左对齐" class="iconli" @click="menuOption('textleft')">
          <i class="icon-iconspace_AllignmentLeft_px"></i>
        </li>
        <li title="右对齐" class="iconli" @click="menuOption('textright')">
          <i class="icon-youduiqi"></i>
        </li>
        <li title="居中" class="iconli" @click="menuOption('textcenter')">
          <i class="icon-iconspace_AllignmentCenter_px"></i>
        </li>
        <li title="加粗" class="iconli" @click="menuOption('textWeight')">
          <i class="icon-jiacu"></i>
        </li>
        <li title="斜体" class="iconli" @click="menuOption('textstyle')">
          <i class="icon-xieti"></i>
        </li>
        <li title="行高" class="iconli">
          <el-dropdown trigger="click" @command="lineHchange">
            <span class="el-dropdown-link">
              <i class="icon-xinggao"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">1.0</el-dropdown-item>
              <el-dropdown-item command="1.5">1.5</el-dropdown-item>
              <el-dropdown-item command="2">2.0</el-dropdown-item>
              <el-dropdown-item command="3">3.0</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
      <div class="introduce">文字</div>
    </li>
    <li class="fatherli">
      <ul class="action style">
        <li title="线条样式">
          <div>
            <el-select
              placeholder="线条样式"
              :disabled="disabledFlag()"
              v-model="line"
              @change="lineChage"
            >
              <el-option label="直线" value="0,0">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <g
                    _ngcontent-ehr-c51=""
                    fill="none"
                    stroke="black"
                    stroke-width="1"
                  >
                    <path stroke-dasharray="0,0" d="M0 17 l85 0"></path>
                  </g>
                </svg>
              </el-option>
              <el-option label="虚线" value="5,5">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <g
                    _ngcontent-ehr-c51=""
                    fill="none"
                    stroke="black"
                    stroke-width="1"
                  >
                    <path stroke-dasharray="5,5" d="M0 17 l85 0"></path>
                  </g>
                </svg>
              </el-option>
              <el-option label="宽虚线" value="10,10">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <g fill="none" stroke="black" stroke-width="1">
                    <path stroke-dasharray="10,10" d="M0 17 l85 0"></path>
                  </g>
                </svg>
              </el-option>
              <el-option label="点虚线" value="10,10,2,10">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <g fill="none" stroke="black" stroke-width="1">
                    <path stroke-dasharray="10,10,2,10" d="M0 17 l85 0"></path>
                  </g>
                </svg>
              </el-option>
            </el-select>
            <el-color-picker
              :disabled="disabledFlag()"
              title="边框颜色"
              v-model="linecolor"
              @change="changelinecolor"
            ></el-color-picker>
          </div>
        </li>
        <li title="线条粗细">
          <div>
            <el-select
              :disabled="disabledFlag()"
              v-model="thickness"
              @change="thicknessChage"
              placeholder="线条粗细"
            >
              <el-option label="正常" :value="1"> </el-option>
              <el-option label="加粗" :value="2"> </el-option>
            </el-select>
            <el-color-picker
              :disabled="disabledFlag()"
              title="填充色"
              v-model="linethickness"
              @change="changelinethickness"
            ></el-color-picker>
          </div>
        </li>
      </ul>
      <div class="introduce">样式</div>
    </li>
    <li class="fatherli">
      <ul class="action line">
        <li>
          <el-select
            v-model="lineType"
            @change="lineTypeChange"
            placeholder="连线类型"
          >
            <template slot="prefix">
              <i :class="'t-icon t-' + lineType"></i>
            </template>
            <el-option
              v-for="(item, index) in lineTypeList"
              :key="index"
              :value="item.value"
            >
              {{ item.label }} <i :class="'t-icon t-' + item.value"></i>
            </el-option>
          </el-select>
          <el-dropdown title="" trigger="click">
            <span class="el-dropdown-link">
              <i :class="'t-icon t-' + lineType"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :disabled="!nodeprops.line"
                :command="item.value"
                v-for="(item, index) in lineTypeList"
                :key="index"
              >
                {{ item.label }} <i :class="'t-icon t-' + item.value"></i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown
            title="开始箭头"
            @command="fromArrowChange"
            trigger="click"
            placeholder="开始箭头"
          >
            <span class="el-dropdown-link">
              <i :class="'t-icon t-from-' + fromArrow"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :disabled="!nodeprops.line"
                :command="item.value"
                v-for="(item, index) in ArrowList"
                :key="index"
                ><i :class="'t-icon t-from-' + item.value"></i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <br />
        <li title="结束箭头">
          <el-dropdown
            placeholder="结束箭头"
            @command="toArrowChange"
            trigger="click"
          >
            <span class="el-dropdown-link">
              <i :class="'t-icon t-to-' + toArrow"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :disabled="!nodeprops.line"
                :command="item.value"
                v-for="(item, index) in ArrowList"
                :key="index"
                ><i :class="'t-icon t-to-' + item.value"></i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
      <div class="introduce">连接方式</div>
    </li>
    <li class="fatherli">
      <ul class="action align">
        <li title="左对齐" @click="menuOption('nodeleft')">
          <img src="@/assets/img/equipment/left.png" alt="" />
        </li>
        <li title="右对齐" @click="menuOption('noderight')">
          <img src="@/assets/img/equipment/right.png" alt="" />
        </li>
        <li title="底部对齐" @click="menuOption('nodebottom')">
          <img src="@/assets/img/equipment/bottom.png" alt="" />
        </li>
        <li title="水平居中" @click="menuOption('nodemiddle')">
          <img src="@/assets/img/equipment/center.png" alt="" />
        </li>
        <li title="顶部对齐" @click="menuOption('nodetop')">
          <img src="@/assets/img/equipment/top.png" alt="" />
        </li>
        <br />
        <li
          style="margin-top:5px;"
          title="垂直居中"
          @click="menuOption('nodecenter')"
        >
          <img
            style="transform: rotate(-90deg);"
            src="@/assets/img/equipment/center.png"
            alt=""
          />
        </li>
        <li title="水平分布" @click="menuOption('nodehorizontal')">
          <img
            src="@/assets/img/equipment/vertical.png"
            alt=""
            style="transform:rotate(90deg)"
          />
        </li>
        <li title="垂直分布" @click="menuOption('nodevertical')">
          <img src="@/assets/img/equipment/vertical.png" alt="" />
        </li>
      </ul>
      <div class="introduce">对齐</div>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    nodeprops: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      parent: this.$parent,
      iconcolor: "#409EFF",
      fontSize: "20",
      fontcolor: "#409EFF",
      line: "",
      linecolor: "#409EFF",
      thickness: "",
      linethickness: "#409EFF",
      fromArrow: "",
      toArrow: "",
      ArrowList: [
        {
          value: ""
        },
        {
          value: "triangleSolid"
        },
        {
          value: "triangle"
        },
        {
          value: "diamondSolid"
        },
        {
          value: "diamond"
        },
        {
          value: "circleSolid"
        },
        {
          value: "circle"
        },
        {
          value: "line"
        },
        {
          value: "lineUp"
        },
        {
          value: "lineDown"
        }
      ],
      lineType: "",
      lineTypeList: [
        {
          label: "线段",
          value: "polyline"
        },
        {
          label: "直线",
          value: "line"
        }
      ]
    };
  },
  methods: {
    menuOption(e) {
      console.log(1, e);
    },
    fullpage() {
      this.$emit("fullpage");
    },
    onChange() {
      this.$emit("change", this.nodeprops.node);
    },
    //图标颜色修改
    iconColor() {
      if (this.nodeprops.nodes) {
        this.nodeprops.nodes.forEach(i => {
          i.iconColor = this.iconcolor;
        });
      }
      if (this.nodeprops.node) {
        this.nodeprops.node.iconColor = this.iconcolor;
      }

      this.onChange();
    },
    // 禁用
    disabledFlag() {
      return false;
      // if (this.nodeprops.node && this.nodeprops.node.iconFamily == "ltee") {
      //   return false;
      // } else {
      //   return true;
      // }
    },
    //递归修改字体大小
    recursionSize(item) {
      if (this.nodeprops.node) {
        item.children.forEach(i => {
          if (i.name == "text") {
            this.recursionSize(i);
          }
        });
      }

      item.fontSize = this.fontSize;
    },
    //字体大小修改
    sizeChage() {
      if (this.nodeprops.node) {
        this.recursionSize(this.nodeprops.node);
      }
      if (this.nodeprops.line) {
        this.recursionSize(this.nodeprops.line);
      }

      this.onChange();
    },
    //字体颜色修改
    fontcolorChage() {
      if (this.nodeprops.nodes) {
        this.nodeprops.nodes.forEach(i => {
          i.fontColor = this.fontcolor;
        });
      }
      if (this.nodeprops.node) {
        this.nodeprops.node.fontColor = this.fontcolor;
      }
      if (this.nodeprops.line) {
        this.nodeprops.line.fontColor = this.fontcolor;
      }
      this.onChange();
    },
    //文字行高改变
    lineHchange(e) {
      this.nodeprops.node.lineHeight = e;
      this.onChange();
    },
    //修改背景颜色
    changelinethickness() {
      if (this.nodeprops.node) {
        this.nodeprops.node.bkType = 0;
        this.nodeprops.node.fillStyle = this.linethickness;
      }
      if (this.nodeprops.line) {
        this.nodeprops.line.bkType = 0;
        this.nodeprops.line.textBackground = this.linethickness;
      }
      this.onChange();
    },
    //连线方式
    lineTypeChange(e) {
      if (this.nodeprops.line) {
        this.nodeprops.line.name = e;
      }
      this.parent.returnCanvas().data.lineName = e;
      this.onChange();
    },
    //开始箭头
    fromArrowChange(e) {
      this.fromArrow = e;
      this.nodeprops.line.fromArrow = e;
      this.parent.returnCanvas().data.fromArrow = e;
      this.onChange();
    },
    //结束箭头
    toArrowChange(e) {
      this.toArrow = e;
      this.nodeprops.line.toArrow = e;
      this.parent.returnCanvas().data.toArrow = e;
      this.onChange();
    },
    initNodeProp() {
      var node = this.nodeprops.node;
      var line = this.nodeprops.line;
      this.line = node
        ? node.lineDash
          ? node.lineDash.join(",")
          : ""
        : line.lineDash
        ? line.lineDash.join(",")
        : "";
      this.linecolor = node ? node.strokeStyle : line.strokeStyle;
      this.fontFamily = node ? node.fontFamily : "";
      this.fontSize = node ? node.fontSize : line.fontSize;
      this.fontcolor = node ? node.fontColor : line.fontColor;
      this.thickness = node ? node.lineWidth : line.lineWidth;
      this.linethickness = node ? node.fillStyle : line.textBackground;
      this.iconcolor = node ? node.iconColor : "";
      this.lineType = line ? line.name : "";
      this.fromArrow = line ? line.fromArrow : "";
      this.toArrow = line ? line.toArrow : "";
    },
    //修改线条粗细
    thicknessChage() {
      if (this.nodeprops.nodes) {
        this.nodeprops.nodes.forEach(i => {
          i.lineWidth = Number(this.thickness);
        });
      }
      if (this.nodeprops.node) {
        this.nodeprops.node.lineWidth = Number(this.thickness);
      }
      if (this.nodeprops.line) {
        this.nodeprops.line.lineWidth = Number(this.thickness);
      }
      this.onChange();
    },
    //线条改变
    lineChage() {
      var value = this.line.split(",");
      if (this.nodeprops.node) {
        this.nodeprops.node.lineDash = value;
      }
      if (this.nodeprops.line) {
        this.nodeprops.line.lineDash = value;
      }
      this.onChange();
    },
    //修改线条颜色
    changelinecolor() {
      if (this.nodeprops.nodes) {
        this.nodeprops.nodes.forEach(i => {
          i.strokeStyle = this.linecolor;
        });
      }
      if (this.nodeprops.node) {
        this.nodeprops.node.strokeStyle = this.linecolor;
      }
      if (this.nodeprops.line) {
        this.nodeprops.line.strokeStyle = this.linecolor;
      }
      this.onChange();
    }
  }
};
</script>
<style lang="scss">
@import url("//at.alicdn.com/t/font_2030495_qjucevcilen.css");
.el-dropdown-menu {
  background-color: #297fb1;
  border-color: #297fb1;
  li {
    color: white;
    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
      color: #0ceaf3;
    }
  }
  ::v-deep .popper__arrow {
    border-bottom-color: #297fb1 !important;

    &::after {
      border-bottom-color: #297fb1 !important;
    }
  }
}
.el-select-dropdown {
  ul {
    li {
      padding: 0 10px;
      text-align: center;
      // height: 20px;

      svg {
        width: 55px;
        height: 100%;
        line-height: 34px;
      }
    }
  }
}
.draw-header {
  font-size: 0;
  width: 100%;
  height: 100px;
  background-color: #4878c8;
  .fatherli {
    width: auto;
    height: 100%;
    display: inline-block;
    padding: 15px 20px 0 20px;
    position: relative;
    vertical-align: bottom;
    border-right: 1px solid #5a83d3;
    .action {
      font-size: 12px;
      min-height: 43px;
      color: #fff;
      &.align {
        li {
          width: 25px;
          height: 25px;
          margin-right: 10px;
          &:last-child {
            margin-right: 0;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      &.style {
        li {
          display: block;
          div {
            .el-select {
              vertical-align: top;
              margin-bottom: 5px;
              margin-right: 5px;
              width: 88px;
              height: 17px !important;
              font-size: 12px;
              border: 1px solid #00d7ff;
              background-color: transparent;
              .el-input {
                .el-input__suffix {
                  right: -3px;
                  display: none;
                  .el-input__icon {
                    line-height: 17px;
                    color: #00d7ff;
                  }
                }
                input {
                  border: none;
                  color: white;
                  padding: 0;
                  padding-left: 3px;
                  border-radius: 0;
                  height: 17px !important;
                  font-size: 12px;
                  background-color: transparent;
                }
              }
            }
            .el-color-picker {
              height: 19px;
              overflow: hidden;
              border: 1px solid #00d7ff;
              width: 30px;
              .el-color-picker__mask {
                display: none;
              }
              .el-color-picker__trigger {
                width: 100%;
                height: 100%;
                padding: 0;
                border-radius: 0;
                border: none;
                .el-color-picker__color {
                  width: 100%;
                  height: 100%;
                  border: none;
                  border-radius: 0;
                  .el-icon-close {
                    display: none;
                  }
                }
                .el-color-picker__icon {
                  display: none;
                }
              }
            }
          }
        }
      }
      &.operation {
        padding-left: 12px;
        padding-right: 12px;
        li {
          margin-right: 20px;
          &:last-child {
            margin: 0;
          }
          text-align: center;
          p {
            font-size: 10px;
            color: #fff;
            margin-top: 8px;
          }
          i {
            font-size: 26px;
          }
          &.disable {
            pointer-events: none;
            p {
              color: #9a9a9a;
            }
            i {
              color: #9a9a9a;
            }
          }
        }
      }
      &.behavior {
        padding-top: 5px;
        li {
          margin-right: 10px;
          &.top {
            margin-top: 10px;
          }
          &.nomargin {
            margin-right: 0;
          }
          i {
            font-size: 15px;
          }
        }
      }
      &.font {
        .iconli {
          margin-right: 10px;
          &.nomargin {
            margin-right: 0;
          }
          i {
            font-size: 13px;
          }
        }
        .fontColor {
          margin-bottom: 10px;
          width: 30px;
          vertical-align: top;
          border: 1px solid #00d7ff;
          // padding-top: 1px;
          ::v-deep .el-color-picker {
            height: 17px;
            width: 100%;
            .el-color-picker__mask {
              display: none;
            }
            .el-color-picker__trigger {
              width: 100%;
              height: 99%;
              padding: 0;
              border: none;
              .el-color-picker__color {
                width: 100%;
                height: 100%;
                border: none;
                .el-icon-close {
                  display: none;
                }
              }
              .el-color-picker__icon {
                display: none;
              }
            }
          }
        }
        .settingFont {
          margin-right: 5px;
          border: 1px solid #00d7ff;
          width: 65px;
          .el-select {
            .el-input {
              .el-input__suffix {
                right: -3px;
                display: none;
                .el-input__icon {
                  line-height: 17px;
                  color: #00d7ff;
                }
              }
              input {
                border: none;
                color: white;
                padding: 0;
                padding-left: 3px;
                height: 17px;
                font-size: 14px;
                border-radius: 0;
                background-color: transparent;
              }
            }
          }
        }
        .fontSize {
          margin-left: 5px;
          margin-right: 5px;
          border: 1px solid #00d7ff;
          width: 30px;
          .el-select {
            .el-input {
              .el-input__suffix {
                display: none;
                right: -3px;
                .el-input__icon {
                  line-height: 17px;
                  color: #00d7ff;
                }
              }
              input {
                border: none;
                color: white;
                padding: 0;
                padding-left: 3px;
                height: 18px;
                font-size: 14px;
                border-radius: 0;
                background-color: transparent;
              }
            }
          }
        }
      }
      &.line {
        li {
          font-size: 0;
          width: auto;
          .el-select {
            vertical-align: top;
            margin-bottom: 5px;
            margin-right: 5px;
            width: 88px;
            border: 1px solid #00d7ff;
            height: 17px !important;
            font-size: 12px;
            background-color: transparent;
            .el-input {
              .el-input__prefix {
                left: 0;
                right: 0;
                margin: 0 auto;
                i {
                  font-size: 16px;
                }
              }
              .el-input__suffix {
                right: -3px;
                display: none;
                .el-input__icon {
                  line-height: 17px;
                  color: #00d7ff;
                }
              }
              input {
                border: none;
                color: transparent;
                padding: 0;
                padding-left: 3px;
                height: 17px !important;
                font-size: 14px;
                border-radius: 0;
                background-color: transparent;
              }
            }
          }
        }
        .el-dropdown {
          margin-bottom: 5px;
          width: 50px;
          margin-right: 5px;
          .el-dropdown-link {
            display: inline-block;
            width: 100%;
            height: 17px;
            text-align: center;
            border: 1px solid #00d7ff;
            line-height: 17px;
            i {
              width: 100%;
            }
          }
        }
      }

      li {
        display: inline-block;
        i {
          font-family: "iconfont";
          font-size: 24px;
          color: white;
        }
      }
    }
    .introduce {
      margin-top: 15px;
      width: 100%;
      height: auto;
      font-size: 12px;
      color: #00d7ff;
      text-align: center;
    }
  }
}
</style>
