<!--
 * @Author: haifang.qin
 * @Date: 2022-04-01 11:42:47
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-04-27 16:34:21
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
            <H-title title="面积图"></H-title>
            <el-button @click="lookDetail" type="text">查看详情</el-button>
          </div>
          <line-chart :chartConfig="lineChartDatas"></line-chart>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <div class="isFlex justifyContentSpaceBetween">
            <H-title title="复合型图表"></H-title>
            <el-button @click="lookDetail" type="text">查看详情</el-button>
          </div>
          <line-chart :chartConfig="lineBarData"></line-chart>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <div class="isFlex justifyContentSpaceBetween">
            <H-title title="面积图"></H-title>
            <el-button @click="lookDetail" type="text">查看详情</el-button>
          </div>
          <line-chart :chartConfig="lineChartDatas"></line-chart>
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
            <H-title title="进度条"></H-title>
            <el-button @click="lookDetail" type="text">查看详情</el-button>
          </div>
          <div v-for="(item, index) in 5" :key="index">
            <progress-chart2
              :chartConfig="progressData.data[index]"
            ></progress-chart2>
          </div>
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
      <el-col :span="12">
        <div>
          <div class="isFlex justifyContentSpaceBetween">
            <H-title title="饼图空心"></H-title>
            <el-button @click="lookDetail" type="text">查看详情</el-button>
          </div>
          <pie-chart :chartConfig="pieData"></pie-chart>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <div class="isFlex justifyContentSpaceBetween">
            <H-title title="饼图实心"></H-title>
            <el-button @click="lookDetail" type="text">查看详情</el-button>
          </div>
          <pie-chart :chartConfig="pieDatas"></pie-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LineChart from "./component/lineChart.vue";
import ProgressChart from "./component/progressChart.vue";
import ProgressChart2 from "./component/progressTwoChart.vue";
import BarChart from "./component/barChart.vue";
import pieChart from "./component/pieChart.vue";
export default {
  components: { LineChart, ProgressChart, ProgressChart2, BarChart, pieChart },
  data() {
    return {
      lineChartData: {
        xData: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
        data: [[1, 3, 20, 50, 20, 30, 10]],
        unit: "数量",
        smooth: false //是否平滑
      },
      lineChartDatas: {
        xData: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
        data: [
          [10, 0, 20, 0, 60, 10, 10],
          [10, 30, 0, 50, 40, 60, 10]
        ],
        legend: ["晴天", "阴天"],
        unit: "数量",
        smooth: true //是否平滑
      },
      lineBarData: {
        xData: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
        data: [
          [10, 0, 20, 0, 60, 10, 10],
          [10, 30, 0, 50, 40, 60, 10],
          [10, 0, 20, 0, 60, 10, 10]
        ],
        legend: ["晴天", "阴天", "雨天"],
        unit: "次数",
        type: "lineBar" //判断折线和柱状图
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
          [40, 30, 60, 50, 60, 30, 90],
          [20, 30, 20, 50, 20, 50, 60]
        ]
      },
      barType: "stacks", //堆叠图参数
      pieData: {
        legend: ["年度成果", "全部成果"],
        data: [
          { name: "11", value: 2 },
          { name: "122", value: 2 },
          { name: "33", value: 2 }
        ],
        dataTwo: [
          { name: "11", value: 2 },
          { name: "122", value: 2 },
          { name: "33", value: 2 }
        ],
        isCircle: true
      },
      pieDatas: {
        legend: ["年度成果", "全部成果"],
        data: [
          { name: "11", value: 2 },
          { name: "122", value: 2 },
          { name: "33", value: 2 }
        ],
        dataTwo: [
          { name: "11", value: 2 },
          { name: "122", value: 2 },
          { name: "33", value: 2 }
        ]
      }
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
