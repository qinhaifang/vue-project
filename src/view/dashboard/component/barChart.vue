<template>
  <div>
    <div
      ref="barChart"
      v-on-echart-resize
      :style="{ width: width, height: height + 'px' }"
    ></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import "@/global/utils/chart.resize";
const colorList = ["#205DDB", "#1BDFFC"];
export default {
  props: {
    lazyResize: {
      type: Number,
      default: 200
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: Number,
      default: 160
    },
    chartConfig: {
      type: Object,
      default: () => {}
    },
    // stack(堆叠)
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      option: {},
      chart: null
    };
  },
  mounted() {
    this.restoreChart();
    window.addEventListener("resize", () => {
      this.restoreChart();
    });
  },
  methods: {
    restoreChart() {
      this.initData();
      this.initEchart();
      this.refreshChart();
    },
    // 绘制图表
    refreshChart() {
      if (!this.chart) return false;
      this.chart.setOption(this.option || {}, true);
      // 添加根据视口缩放重绘功能
      if (this.lazyResize) {
        window.onresize = () => {
          setTimeout(() => {
            this.chart.resize();
          }, this.lazyResize);
        };
      }
    },
    initEchart() {
      this.chart = echarts.init(this.$refs.barChart);
    },
    initData() {
      if (!this.chartConfig) return;
      this.option = {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          containLabel: true,
          left: 22,
          top: 45,
          right: 40,
          bottom: 0
        },
        xAxis: {
          type: "category",
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(172, 175, 173, .6)"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#fff"
            },
            margin: 15,
            formatter: function(value) {
              var ret = ""; //拼接加\n返回的类目项
              var maxLength = 5; //每项显示文字个数
              var valLength = value.length; //X轴类目项的文字个数
              var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
              if (rowN > 1) {
                //如果类目项的文字大于3,
                for (var i = 0; i < rowN; i++) {
                  var temp = ""; //每次截取的字符串
                  var start = i * maxLength; //开始截取的位置
                  var end = start + maxLength; //结束截取的位置
                  //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                  temp = value.substring(start, end) + "\n";
                  ret += temp; //凭借最终的字符串
                }
                return ret;
              } else {
                return value;
              }
            }
          },
          data: this.chartConfig.xData
        },
        yAxis: [
          {
            type: "value",
            name: this.chartConfig.unit,
            nameTextStyle: {
              color: "#ffffff",
              padding: [2, 30, 2, 0]
            },
            // scale: true,
            min: 0,
            splitNumber: 3,
            axisLabel: {
              textStyle: {
                color: "#fff"
              },
              margin: 10
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(172, 175, 173, .6)"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed", //背景线为虚线
                color: "rgba(172, 175, 173, .1)" //左侧显示线
              }
            },
            data: []
          }
        ],
        series: []
      };
      if (this.type === "stacks") {
        this.chartConfig.data.map((item, index) => {
          this.option.series.push({
            type: "bar",
            data: item,
            stack: "动补",
            barWidth: 20,
            itemStyle: {
              normal: {
                color: colorList[index],
                label: {
                  show: true,
                  textStyle: {
                    color: "#fff"
                  },
                  position: "left",
                  formatter: function(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            }
          });
        });
      } else {
        this.option.series.push({
          type: "bar",
          data: this.chartConfig.data,
          stack: "动补",
          barWidth: 20,
          itemStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0, 214, 237, 0.31)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 214, 237, .9)" // 100% 处的颜色
                  }
                ]
              },
              label: {
                show: true,
                textStyle: {
                  color: "#01E6FF"
                },
                position: "top",
                formatter: function(p) {
                  return p.value > 0 ? p.value : "";
                }
              }
            }
          }
        });
      }
    }
  }
};
</script>
