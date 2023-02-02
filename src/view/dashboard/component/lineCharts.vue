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
      chart: null,
      data: [
        { xAxis: "二月", label: "20" },
        { xAxis: "五月", label: "60" }
      ],
      position: []
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
      let that = this;
      that.chart.setOption({
        graphic: echarts.util.map(this.data, function(item, dataIndex) {
          that.position = [
            that.chart.convertToPixel({ xAxisId: "2" }, item["xAxis"]),
            0
          ];
          return {
            type: "rect",
            z: 100,
            shape: {
              width: 0,
              height: 350
              // r: 10
            },
            position: that.position,
            draggable: true,
            style: {
              fill: "rgba(231,174,173,.2)",
              stroke: "rgba(231,174,173,.2)",
              lineWidth: 4
            },
            cursor: "move",
            ondrag: echarts.util.curry(that.onPointDragging, dataIndex),
            onmousemove: echarts.util.curry(that.showTooltip, dataIndex),
            onmouseout: echarts.util.curry(that.hideTooltip, dataIndex),
            z: 100
          };
        })
      });
      window.addEventListener("resize", function() {
        that.updatePosition(this.data);
      });
      window.addEventListener("mouseup", function() {
        that.updatePosition(this.data);
      });
      that.chart.on("mouseup", that.updatePosition);
      // 添加根据视口缩放重绘功能
      if (this.lazyResize) {
        window.onresize = () => {
          setTimeout(() => {
            that.chart.resize();
          }, that.lazyResize);
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
          name: "日期",
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
          id: "2",
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
            scale: true,
            // splitNumber: 2,
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
          id: index == 0 ? "aaa" : "",
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
          areaStyle: areaColor[index],
          markLine: {
            symbol: "none",
            itemStyle: {
              normal: {
                borderWidth: 1,
                lineStyle: {
                  type: "solid",
                  color: "#ff0000 ",
                  width: 2
                },
                label: {
                  textStyle: {
                    fontSize: 14,
                    color: "#ff0000 "
                  }
                }
              }
            },
            data: [
              { xAxis: "二月", label: "20" },
              { xAxis: "五月", label: "60" }
            ]
          }
        });
      });
    },
    updatePosition(data) {
      this.chart.setOption({
        graphic: echarts.util.map(data, function(item, dataIndex) {
          return {
            position: [
              this.chart.convertToPixel({ xAxisId: "2" }, item["xAxis"]),
              0
            ]
          };
        })
      });
    },
    showTooltip(dataIndex) {
      this.chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: dataIndex
      });
    },
    hideTooltip(dataIndex) {
      this.chart.dispatchAction({
        type: "hideTip"
      });
    },
    onPointDragging(dataIndex) {
      var threshold1 = this.chart.convertFromPixel(
        { xAxisId: "2" },
        this.position[0]
      );
      if (threshold1 < 0) {
        threshold1 = 0;
      }
      if (threshold1 > this.chartConfig.xData.length - 1) {
        threshold1 = this.chartConfig.xData.length - 1;
      }
      this.data[dataIndex] = {
        xAxis: this.chartConfig.xData[threshold1],
        label: this.data[dataIndex].label
      };
      this.chart.setOption({
        series: [
          {
            id: "aaa",
            markLine: {
              data: this.data
            }
          }
        ]
      });
    }
  }
};
</script>
