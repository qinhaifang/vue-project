<!--
 * @Author: haifang.qin
 * @Date: 2022-04-27 16:03:19
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-04-27 16:42:36
 * @FilePath: \vue-project\src\view\dashboard\component\pieChart.vue
-->
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
var colorList = [
  "#008CF9",
  "#FFF8A4",
  "#72FFBD",
  "#9BBCD2",
  "rgb(238,103,35)",
  "#099694",
  "#76ADFD",
  "#F741A6",
  "#FFB80E",
  "rgb(209,209,209)",
  "#E6DE47"
];
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
      default: 180
    },
    chartConfig: {
      type: Object,
      default: () => {}
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
        title: [
          {
            text: this.chartConfig.isCircle ? "年度成果" : "",
            top: "center",
            left: "20.5%",
            textStyle: {
              color: "#fff",
              fontSize: 14,
              fontWeight: 400
            }
          },
          {
            text: this.chartConfig.isCircle ? "全部成果" : "",
            top: "center",
            right: "25.5%",
            textStyle: {
              color: "#fff",
              fontSize: 14,
              fontWeight: 400
            }
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          backgroundColor: "rgba(50,50,50,0.7)",
          borderColor: "#333",
          textStyle: {
            color: "#fff",
            fontSize: 12,
            fontWeight: "normal",
            fontFamily: "sans-serif"
          }
        },
        legend: {
          orient: "horizontal",
          bottom: 0,
          itemWidth: 11, // 图例标记的图形宽度。
          itemGap: 15, // 图例每项之间的间隔。
          itemHeight: 10, //  图例标记的图形高度。
          padding: [30, 0, 0, 0],
          textStyle: {
            color: "#fff"
          },
          data: this.chartConfig.name
        },
        series: [
          {
            name: this.chartConfig.legend[0],
            type: "pie",
            radius: this.chartConfig.isCircle ? ["35%", "50%"] : ["0", "60%"],
            avoidLabelOverlap: true, //对，就是这里avoidLabelOverlap
            center: ["25%", "50%"],
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex];
                }
              }
            },
            label: {
              align: "left",
              normal: {
                color: "#fff",
                formatter: params => {
                  return (
                    "{name|" +
                    params.name +
                    "}" +
                    "{n|" +
                    "\n" +
                    "}" +
                    "{value|" +
                    params.value +
                    "}"
                  );
                },
                rich: {
                  name: {
                    fontSize: 12,
                    padding: [0, 10, 0, 4],
                    color: "#fff"
                  },
                  value: {
                    fontSize: 12,
                    padding: [0, 10, 0, 4],
                    color: "#fff"
                  }
                  // "\n": {
                  //   height: "2px",
                  // },
                },
                textStyle: {
                  fontSize: 14
                }
              }
            },
            data: this.chartConfig.data
          },
          {
            name: this.chartConfig.legend[1],
            type: "pie",
            radius: this.chartConfig.isCircle ? ["35%", "50%"] : [0, "60%"],
            avoidLabelOverlap: true, //对，就是这里avoidLabelOverlap
            center: ["70%", "50%"],
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex];
                }
              }
            },
            label: {
              align: "left",
              normal: {
                color: "#fff",
                formatter: params => {
                  return (
                    "{name|" +
                    params.name +
                    "}" +
                    "\n" +
                    "{value|" +
                    params.value +
                    "}"
                  );
                },
                rich: {
                  name: {
                    fontSize: 12,
                    padding: [0, 10, 0, 4],
                    color: "#fff"
                  },
                  value: {
                    fontSize: 12,
                    padding: [0, 10, 0, 4],
                    color: "#fff"
                  }
                },
                textStyle: {
                  fontSize: 12
                }
              }
            },
            data: this.chartConfig.dataTwo
          }
        ]
      };
    }
  }
};
</script>
