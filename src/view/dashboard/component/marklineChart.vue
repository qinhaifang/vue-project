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
      threshold1: "",
      xData: ["1年", "2年", "3年", "4年", "5年", "6年", "7年", "8年"],
      yData: [8.1, 13.3, 1.5, 14.6, 10.8, 9.0, 9.2, 9.3],
      markLineData: [
        { xAxis: "1年", name: "8.1" },
        { xAxis: "3年", name: "1.5" }
      ]
    };
  },
  watch: {
    threshold1(n, v) {
      this.updatePosition();
      this.refreshChart();
    }
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
      this.initGraphic();
      // 添加根据视口缩放重绘功能
      if (this.lazyResize) {
        window.onresize = () => {
          setTimeout(() => {
            this.chart.resize();
          }, this.lazyResize);
        };
      }
    },
    initGraphic() {
      let that = this;
      that.chart.setOption({
        graphic: echarts.util.map(this.markLineData, function(item, dataIndex) {
          return {
            type: "rect",
            z: 100,
            id: dataIndex,
            shape: {
              width: 0,
              height: 180
              // r: 10
            },
            position: [
              that.chart.convertToPixel({ xAxisId: "2" }, item.xAxis),
              0
            ],
            draggable: true,
            style: {
              fill: "rgba(231,174,173,.2)",
              stroke: "rgba(231,174,173,.2)",
              lineWidth: 4
            },
            cursor: "move",
            ondrag: that.onPointDragging,
            onmousemove: that.showTooltip,
            onmouseout: that.hideTooltip
          };
        })
      });
    },
    initEchart() {
      this.chart = echarts.init(this.$refs.lineChart);
    },
    initData() {
      if (!this.chartConfig) return;
      this.option = {
        color: ["#F8CB00"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          containLabel: true,
          left: 12,
          top: 45,
          right: 40,
          bottom: 0
        },
        xAxis: [
          {
            id: "2",
            type: "category",
            data: ["1年", "2年", "3年", "4年", "5年", "6年", "7年", "8年"]
          }
        ],
        yAxis: {
          type: "value",
          id: "2",
          axisLabel: {
            formatter: "{value}"
          }
        },
        series: [
          {
            id: "aaa",
            name: "",
            type: "line",
            data: [8.1, 13.3, 1.5, 14.6, 10.8, 9.0, 9.2, 9.3],
            markLine: {
              //开始标预警线
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  lineStyle: {
                    type: "dash",
                    color: "red",
                    width: 2
                  },
                  label: {
                    textStyle: {
                      fontSize: 16,
                      fontWeight: "bolder"
                    }
                  }
                }
              },
              data: this.markLineData
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  //根据预警线的值 显示对应的颜色
                  // build a color map as your need.
                  var colorList = ["#c23531", "#c5bf66 "];
                  // if (params.data > threshold) {
                  //   return colorList[0];
                  // } else if (params.data < threshold) {
                  //   return colorList[1];
                  // }
                }
              }
            }
          }
        ]
      };
    },
    updatePosition() {
      let that = this;
      that.chart.setOption({
        graphic: echarts.util.map(that.markLineData, function(item, dataIndex) {
          return {
            position: [
              that.chart.convertToPixel({ xAxisId: "2" }, item["xAxis"]),
              0
            ]
          };
        })
      });
    },
    showTooltip(e) {
      let that = this;
      that.chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: e.target.position
      });
    },
    hideTooltip() {
      let that = this;
      that.chart.dispatchAction({
        type: "hideTip"
      });
    },
    onPointDragging(e) {
      //阈值变动
      this.threshold1 = this.chart.convertFromPixel(
        { xAxisId: "2" },
        e.target.position[0]
      );
      if (this.threshold1 < 0) {
        this.threshold1 = 0;
      }
      if (this.threshold1 > this.xData.length - 1) {
        this.threshold1 = this.xData.length - 1;
      }
      this.markLineData[Number(e.target.id)] = {
        xAxis: this.xData[this.threshold1],
        name: this.yData[this.threshold1]
      };
    }
  }
};
</script>
