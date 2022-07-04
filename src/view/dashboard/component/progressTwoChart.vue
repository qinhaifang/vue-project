<!--
 * @Author: haifang.qin
 * @Date: 2022-04-27 11:09:52
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-06-06 14:42:45
 * @FilePath: \vue-project\src\view\dashboard\component\progressTwoChart.vue
-->
<template>
  <div>
    <p>{{ chartConfig.name }}</p>
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
      default: 30
    },
    chartConfig: {
      type: Object,
      default: {}
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
      if (!this.chartConfig) return;
      this.option = {
        xAxis: {
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        grid: {
          containLabel: true,
          left: 0,
          top: 0,
          right: 50,
          bottom: 0
        },
        title: {
          text: this.chartConfig.value + "%",
          right: 0,
          top: "middle",
          textStyle: {
            fontWeight: 500,
            fontSize: 14,
            color: "#01E6FF"
          }
        },
        yAxis: [
          {
            inverse: true,
            axisLine: {
              show: false
            },
            data: []
          }
        ],
        series: [
          {
            name: "123",
            type: "bar",
            stack: "总量",
            data: [this.chartConfig.value],
            barWidth: 6,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#161717"
                  },
                  {
                    offset: 0.5,
                    color: "#01DDF5"
                  },
                  {
                    offset: 1,
                    color: "#FFF8A4"
                  }
                ]),
                barBorderRadius: [10, 10, 10, 10]
              }
            }
          },
          {
            name: "123",
            type: "bar",
            stack: "总量",
            data: [100],
            barWidth: 6,
            silent: true,
            showBackground: true,
            backgroundStyle: {
              color: "rgba(144, 255, 228, .1)",
              barBorderRadius: [10, 10, 10, 10]
            },
            itemStyle: {
              normal: {
                color: "rgba(144, 255, 228, .1)",
                barBorderRadius: [10, 10, 10, 10]
              }
            }
          }
        ]
      };
    }
  }
};
</script>
<style lang="scss" scoped>
p {
  color: #fff;
}
</style>
