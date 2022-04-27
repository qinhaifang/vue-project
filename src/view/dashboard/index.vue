<!--
 * @Author: haifang.qin
 * @Date: 2022-04-01 11:42:47
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-04-02 15:17:26
 * @FilePath: \vue-project\src\view\dashboard\index.vue
-->
<template>
  <div>
    <el-row :gutter="20" class="pageEcharts">
      <el-col :span="12">
        <div>
          <div class="isFlex justifyContentSpaceBetween">
            <H-title title="超出后动态向右移动"></H-title>
            <el-button @click="lookDetail" type="text">查看详情</el-button>
          </div>
          <line-chart :chartConfig="lineChartData"></line-chart>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <div class="isFlex justifyContentSpaceBetween">
            <H-title title="进度条"></H-title>
            <el-button @click="lookDetail" type="text">查看详情</el-button>
          </div>
          <progress-chart :chartConfig="progressData"></progress-chart>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <div class="isFlex justifyContentSpaceBetween">
            <H-title title="柱状图"></H-title>
            <el-button @click="lookDetail" type="text">查看详情</el-button>
          </div>
          <bar-chart :chartConfig="barData"></bar-chart>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <div class="isFlex justifyContentSpaceBetween">
            <H-title title="堆叠柱状图"></H-title>
            <el-button @click="lookDetail" type="text">查看详情</el-button>
          </div>
          <bar-chart :chartConfig="stackData" :type="barType"></bar-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LineChart from "./component/lineChart.vue";
import ProgressChart from "./component/progressChart.vue";
import BarChart from "./component/barChart.vue";
export default {
  components: { LineChart, ProgressChart, BarChart },
  data() {
    return {
      lineChartData: {
        xData: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
        yData: [1, 3, 20, 50, 20, 30, 10],
        unit: "数量"
      },
      progressData: {
        data: [
          { name: "一月", value: 10 },
          { name: "二月", value: 30 },
          { name: "三月", value: 60 },
          { name: "四月", value: 80 },
          { name: "五月", value: 10 }
        ]
      },
      barData: {
        unit: "数量",
        xData: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
        data: [1, 3, 20, 50, 20, 30, 10]
      },
      stackData: {
        unit: "数量",
        xData: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
        data: [
          [1, 3, 20, 50, 20, 30, 10],
          [1, 3, 20, 50, 20, 30, 10]
        ]
      },
      barType: "stacks"
    };
  },
  methods: {
    lookDetail() {}
  }
};
</script>
<style lang="scss" scoped>
.pageEcharts {
  & > div > div {
    background: #000;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
  }
  & > div > div.noBackground {
    background: #fff;
    padding-bottom: 0px;
  }
  .el-input__inner {
    background: #f1f8fe;
  }
}
</style>
