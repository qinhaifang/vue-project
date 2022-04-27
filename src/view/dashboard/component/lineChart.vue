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
const colorList = ["#008CF9", "#72FFBD", "#FFF8A4", "#DF9B58"];
const areaColor = [
  {
    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
      {
        offset: 0,
        color: "rgba(0,140,249,0)"
      },
      {
        offset: 1,
        color: "rgba(0,140,249,.4)"
      }
    ]) //渐变色
  },
  {
    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
      {
        offset: 0,
        color: "rgba(114, 255, 189,0)"
      },
      {
        offset: 1,
        color: "rgba(114, 255, 189,.4)"
      }
    ]) //渐变色
  },
  {
    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
      {
        offset: 0,
        color: "rgba(255, 248, 164,0)"
      },
      {
        offset: 1,
        color: "rgba(255, 248, 164, .4)"
      }
    ]) //渐变色
  },
  {
    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
      {
        offset: 0,
        color: "rgba(223, 155, 88,0)"
      },
      {
        offset: 1,
        color: "rgba(223, 155, 88, .4)"
      }
    ]) //渐变色
  }
];
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
      this.chart = echarts.init(this.$refs.lineChart);
    },
    initData() {
      var that = this;
      if (!that.chartConfig) return;
      this.option = {
        color: ["#008CF9", "#72FFBD", "#FFF8A4", "#DF9B58"],
        // 鼠标移上去显示
        tooltip: {
          trigger: "axis",
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
          right: 20,
          icon: "circle",
          align: "left",
          itemGap: 20,
          itemWidth: 10,
          itemStyle: {
            // color: "#fff"
          },
          textStyle: {
            color: "#fff",
            fontSize: 12
          },
          data: that.chartConfig.legend
        },
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
        series: []
      };
      that.chartConfig.data.map((item, index) => {
        that.option.series.push({
          name: that.chartConfig.legend ? that.chartConfig.legend[index] : "",
          type:
            that.chartConfig.type === "lineBar"
              ? index === 0
                ? "line"
                : "bar"
              : "line",
          // 区分柱状图和折线图
          colorBy: "series", //按照系列分配调色盘中的颜色，同一系列中的所有数据都是用相同的颜色；
          barWidth: 18,
          smooth: that.chartConfig.smooth,
          data: item,
          itemStyle: {
            normal: {
              color: colorList[index]
            }
          },
          areaStyle: areaColor[index]
        });
      });
      // 判断单条数据超过6自动向右移动
      if (that.chartConfig.data.length === 1) {
        var startNumber = 0;
        var xAxisDatalen = that.chartConfig.data[0].length;
        var len = 5; //设置超出的数据量
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
  }
};
</script>
