<template>
  <div>
    <div
      ref="lineChart"
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
      default: 140
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
      this.chart = echarts.init(this.$refs.lineChart);
    },
    initData() {
      var that = this;
      if (!that.chartConfig) return;
      this.option = {
        grid: {
          containLabel: true,
          left: 12,
          top: 45,
          right: 40,
          bottom: 0
        },
        dataZoom: [
          {
            type: "slider",
            show: false,
            realtime: true,
            startValue: 0,
            endValue: 7, // 初始显示index0-30的数据,可根据你的数据量设置
            filterMode: "none"
          }
        ],
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
            margin: 15
          },
          data: that.chartConfig.xData
        },
        yAxis: [
          {
            type: "value",
            name: that.chartConfig.unit,
            nameTextStyle: {
              color: "#ffffff",
              padding: [2, 30, 2, 0]
            },
            // scale: true,
            splitNumber: 2,
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
        series: [
          {
            name: "123",
            type: "line",
            data: that.chartConfig.yData,
            barWidth: 6,
            itemStyle: {
              normal: {
                color: "rgba(0, 214, 237, 1)",
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            areaStyle: {
              //折线图覆盖面积
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(0, 0, 0, 0)"
                },
                {
                  offset: 1,
                  color: "rgba(0, 214, 237, 0.69)"
                }
              ]) //渐变色
            }
          }
        ]
      };
      var startNumber = 0;
      var xAxisDatalen = that.chartConfig.yData.length;
      var len = 5; //这里请注意
      timer && clearInterval(timer);
      timer = setInterval(function() {
        if (startNumber === xAxisDatalen - len) {
          startNumber = 0;
        }
        that.option.dataZoom[0].startValue = startNumber;
        that.option.dataZoom[0].endValue = startNumber + len;
        startNumber++;
        that.refreshChart();
      }, 2000);
    }
  }
};
</script>
