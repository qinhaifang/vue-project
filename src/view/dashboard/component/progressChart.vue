<template>
  <div>
    <div
      ref="chart"
      v-on-echart-resize
      :style="{ width: width, height: height + 'px' }"
    ></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import "@/global/utils/chart.resize";
var timer = null;
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
      default: 230
    },
    chartConfig: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    chartConfig: {
      handler: function() {
        this.restoreChart();
      },
      deep: true
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
      this.chart.on("click", function(data) {
        // this.$emit("handleClick", { stationType: data.name });
      });
      window.addEventListener("resize", () => {
        this.chart.resize();
      });
    },
    initEchart() {
      this.chart = echarts.init(this.$refs.chart);
    },
    initData() {
      if (!this.chartConfig) return;
      let yData = this.chartConfig.data.map(item => {
        return item.name;
      });
      let xData = this.chartConfig.data.map(item => {
        return item.value;
      });
      let barWidth = 10;
      this.option = {
        grid: {
          containLabel: true,
          left: 20,
          top: 0,
          right: 80,
          bottom: 10
        },
        xAxis: {
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: [
          {
            inverse: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 12,
                color: "#fff"
              }
            },
            data: yData
          }
        ],
        series: [
          {
            //内
            type: "bar",
            barWidth,
            legendHoverLink: false,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#018C84" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#00FBD4" // 100% 处的颜色
                  }
                ]
              }
            },
            data: this.chartConfig.data,
            z: 1,
            animationEasing: "elasticOut"
          },
          {
            // 背景
            id: "pictorialBarFirst",
            type: "pictorialBar",
            animationDuration: 0,
            symbolRepeat: "fixed",
            symbolMargin: "20%",
            symbol: "roundRect",
            symbolSize: [6, barWidth],
            silent: true,
            itemStyle: {
              normal: {
                color: "rgba(0, 0, 0, 0.1)"
              }
            },
            label: {
              normal: {
                show: true,
                position: "right",
                offset: [0, 2],
                distance: 30,
                formatter: function(a, b) {
                  return [
                    `{a|${a.value === 0.5 ? 0 : a.value}}`,
                    `{b|个}`
                  ].join("");
                },
                rich: {
                  a: {
                    fontSize: 16,
                    color: "#fff",
                    padding: [0, 4, 0, 0]
                  },
                  b: {
                    fontSize: 12,
                    color: "#fff"
                  }
                }
              }
            },
            data: xData.map(item => {
              //为了处理数值为0时，label不显示的问题
              if (item === 0) {
                item = 0.5;
              }
              return item;
            }),
            z: 0,
            animationEasing: "elasticOut"
          },
          {
            //分隔
            id: "pictorialBarSecond",
            type: "pictorialBar",
            itemStyle: {
              color: "#000"
            },
            symbolRepeat: "fixed",
            symbolMargin: 2.5,
            symbol: "roundRect",
            symbolClip: true,
            symbolSize: [2, barWidth],
            symbolPosition: "start",
            symbolOffset: [0, 0],
            silent: true,
            data: this.chartConfig.data,
            z: 2,
            animationEasing: "elasticOut"
          }
        ]
      };
    }
  }
};
</script>
